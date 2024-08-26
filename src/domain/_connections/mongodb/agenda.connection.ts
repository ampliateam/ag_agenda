import { Schema, model } from "mongoose";
import { constants } from "@global/configs/constants";

const AgendaSchema = new Schema(
  {
    idUsuario: { type: String, required: true, unique: true },
    idProfesional: { type: String, required: true, unique: true },
    infoSemana: { type: Object, required: true },
    fechaCreacion: { type: Date, required: true },
  }, { versionKey: false }
);

export const AgendaModel = model(constants.nombreStore.agenda, AgendaSchema);
