import { Schema, Types, model } from "mongoose";
import { constants } from "@global/configs/constants";

// Guardar el valor por defecto de cada campo aqui

const AgendaSchema = new Schema(
  {
    idUsuario: { type: String, required: true },
    idProfesional: { type: String, required: true },
    infoSemana: { type: Object, required: true },
    fechaCreacion: { type: Date, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

// Duplicate the ID field.
AgendaSchema.virtual("id").set(function (v: string) {
  this._id = new Types.ObjectId(v);
});
AgendaSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

export const AgendaModel = model(constants.nombreStore.agenda, AgendaSchema);
