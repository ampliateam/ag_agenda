import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import {
  verificarConflictoAgendamientoOpActualizar,
  verificarConflictoAgendamientoOpGuardar
} from './middlewares/agendamiento';
import { IAgendamiento } from '@global/models/ag_agenda';

// Definir la interfaz para el documento
interface IAgendamientoMongoose extends Document, Omit<IAgendamiento, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
const defaultValue = {
  idServicioProfesional: '',
  idLocal: '',
  nota: '',
  fechaConfirmado: null,
  fechaEliminacion: null,
};

// Schema de mongoose
const AgendamientoSchema = new Schema<IAgendamientoMongoose>(
  {
    idAgenda: { type: String, require: true },
    idCliente: { type: String, required: true },
    idProfesional: { type: String, required: true },
    idServicioProfesional: { type: String, required: false, default: defaultValue.idServicioProfesional, },
    idLocal: { type: String, required: false, default: defaultValue.idLocal, },
    tipo: { type: String, required: true },
    nota: { type: String, required: false, default: defaultValue.nota, },
    encuentro: { type: Object, required: true },
    agendamientoInicio: { type: Date, required: true },
    agendamientoFin: { type: Date, required: true },
    estado: { type: String, required: true },
    fechaConfirmado: { type: Date, required: false, default: defaultValue.fechaConfirmado, },
    fechaCreacion: { type: Date, required: true },
    fechaEliminacion: { type: Date, required: false, default: defaultValue.fechaEliminacion, },
  }, { versionKey: false }
);

// Create an index for efficient querying
AgendamientoSchema.index({ idProfesional: 1, agendamientoInicio: 1, agendamientoFin: 1, estado: 1 });

AgendamientoSchema.pre('save', async function(next) {
  try {
    console.log('proceso [save]');
    await verificarConflictoAgendamientoOpGuardar(this);
    next();
  } catch (error) {
    next(error);
  }
});

// Agregamos un hook pre-updateOne para manejar actualizaciones directas
AgendamientoSchema.pre('updateOne', async function(next) {
  try {
    console.log('proceso [updateOne]');
    await verificarConflictoAgendamientoOpActualizar(this);
    next();
  } catch (error) {
    next(error);
  }
});

AgendamientoSchema.pre('findOneAndUpdate', async function(next) {
  try {
    console.log('proceso [findOneAndUpdate]');
    await verificarConflictoAgendamientoOpActualizar(this);
    next();
  } catch (error) {
    next(error);
  }
});

AgendamientoSchema.pre('updateMany', async function(next) {
  try {
    console.log('proceso [updateMany]');
    await verificarConflictoAgendamientoOpActualizar(this);
    next();
  } catch (error) {
    next(error);
  }
});

export const AgendamientoModel = model<IAgendamientoMongoose>(
  constants.nombreStore.agendamiento,
  AgendamientoSchema
);
