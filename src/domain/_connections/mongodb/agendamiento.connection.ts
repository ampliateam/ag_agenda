import { Schema, model } from "mongoose";
import { constants } from "@global/configs/constants";
import { IAgendamiento } from "@global/models/interfaces";

// Guardar el valor por defecto de cada campo aqui
const defaultValue = {
  fechaEliminacion: null,
};

const AgendamientoSchema = new Schema(
  {
    idProfesional: { type: String, required: true },
    idServicioProfesional: { type: String, required: false },
    idCliente: { type: String, required: false },
    idUsuarioProfesional: { type: String, required: true },
    idUsuarioCliente: { type: String, required: false },
    tipo: { type: String, required: true },
    nota: { type: String, required: false },
    agendamientoInicio: { type: Date, required: true },
    agendamientoFin: { type: Date, required: true },
    estado: { type: String, required: true },
    fechaConfirmado: { type: String, required: false },
    fechaCreacion: { type: Date, required: true },
    fechaEliminacion: {
      type: String,
      required: false,
      default: defaultValue.fechaEliminacion,
    },
  }, { versionKey: false }
);

// Create an index for efficient querying
AgendamientoSchema.index({ idProfesional: 1, agendamientoInicio: 1, agendamientoFin: 1, estado: 1 });

AgendamientoSchema.pre('save', async function(next) {
  // Verifica si es un documento nuevo o si los campos relevantes han sido modificados
  if (this.isNew || this.isModified('agendamientoInicio') || this.isModified('agendamientoFin') || this.isModified('estado')) {
    const overlappingAppointment = await AgendamientoModel.findOne({
      idProfesional: this.idProfesional,
      _id: { $ne: this._id },  // Excluye el documento actual en caso de actualización
      estado: { $in: ['pendiente', 'confirmado'] },
      $or: [
        { agendamientoInicio: { $gt: this.agendamientoInicio, $lt: this.agendamientoFin } },
        { agendamientoFin: { $gt: this.agendamientoInicio, $lt: this.agendamientoFin } },
        {
          $and: [
            { agendamientoInicio: { $lte: this.agendamientoInicio } },
            { agendamientoFin: { $gte: this.agendamientoFin } }
          ]
        }
      ]
    });

    if (overlappingAppointment) {
      const error = new Error('No se puede agendar en este horario debido a un conflicto con otro agendamiento.');
      return next(error);
    }
  }
  next();
});

// Agregamos un hook pre-updateOne para manejar actualizaciones directas
AgendamientoSchema.pre('updateOne', async function(next) {
  const update = this.getUpdate() as IAgendamiento;
  if (update.agendamientoInicio || update.agendamientoFin || update.estado) {
    const doc = await AgendamientoModel.findOne(this.getQuery());
    if (!doc) {
      return next(new Error('Documento no encontrado'));
    }

    const newStart = update.agendamientoInicio || doc.agendamientoInicio;
    const newEnd = update.agendamientoFin || doc.agendamientoFin;
    const newEstado = update.estado || doc.estado;

    const overlappingAppointment = await this.model.findOne({
      idProfesional: doc.idProfesional,
      _id: { $ne: doc._id },
      estado: { $in: ['pendiente', 'confirmado'] },
      $or: [
        { agendamientoInicio: { $gt: newStart, $lt: newEnd } },
        { agendamientoFin: { $gt: newStart, $lt: newEnd } },
        {
          $and: [
            { agendamientoInicio: { $lte: newStart } },
            { agendamientoFin: { $gte: newEnd } }
          ]
        }
      ]
    });

    if (overlappingAppointment && (newEstado === 'pendiente' || newEstado === 'confirmado')) {
      return next(new Error('No se puede actualizar el agendamiento debido a un conflicto con otro agendamiento.'));
    }
  }
  next();
});

export const AgendamientoModel = model(
  constants.nombreStore.agendamiento,
  AgendamientoSchema
);
