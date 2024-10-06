import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import { IAgenda, TAgendaInfoSemana } from '@global/models/ag_agenda';

// Definir la interfaz para el documento
interface IAgendaMongoose extends Document, Omit<IAgenda, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
const defaultValue = {
  infoSemana: [
    {
      dia: 'lunes',
      recesos: [],
    },
    {
      dia: 'martes',
      recesos: [],
    },
    {
      dia: 'miercoles',
      recesos: [],
    },
    {
      dia: 'jueves',
      recesos: [],
    },
    {
      dia: 'viernes',
      recesos: [],
    },
    {
      dia: 'sabado',
      recesos: [],
    },
    {
      dia: 'domingo',
      recesos: [],
    },
  ] as TAgendaInfoSemana[],
  fechaCreacion: Date.now,
};

// Schema de mongoose
const AgendaSchema = new Schema<IAgendaMongoose>({
  idProfesional: { type: String, required: true, unique: true, },
  infoSemana: { type: [Object], required: false, default: defaultValue.infoSemana },
  fechaCreacion: { type: Date, required: false, default: defaultValue.fechaCreacion, },
}, { versionKey: false });

export const AgendaModel = model<IAgendaMongoose>(constants.nombreStore.agenda, AgendaSchema);
