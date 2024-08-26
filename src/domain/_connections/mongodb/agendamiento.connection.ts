import { Schema, model } from "mongoose";
import { constants } from "@global/configs/constants";

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

export const AgendamientoModel = model(
  constants.nombreStore.agendamiento,
  AgendamientoSchema
);
