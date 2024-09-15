import { Schema, model } from "mongoose";
import { constants } from "@global/configs/constants";

const defaultValue = {
  infoSemana:
    [
      {
        dia: "lunes",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "martes",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "miercoles",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "jueves",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "viernes",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "sabado",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
      {
        dia: "domingo",
        esDiaLaboral: false,
        atencion: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
        almuerzo: {
          horaInicio: "00:00",
          horaFin: "00:00"
        },
      },
    ]

};

const AgendaSchema = new Schema(
  {
    idUsuario: { type: String, required: true },
    idProfesional: { type: String, required: true },
    infoSemana: { type: Object, required: true, default: defaultValue.infoSemana },
    fechaCreacion: { type: Date, required: true },
  }, { versionKey: false }
);

// Crear un índice único compuesto
AgendaSchema.index({
  idUsuario: 1,
  idProfesional: 1,
}, {
  unique: true,
});

// Middleware pre-save para verificar duplicados
AgendaSchema.pre('save', async function (next) {
  const doc = this;
  const exists = await AgendaModel.findOne({
    _id: { $ne: doc._id }, // Excluir el documento actual en caso de actualización
    idUsuario: doc.idUsuario,
    idProfesional: doc.idProfesional,
  });

  if (!exists) return next();

  const err = new Error('Ya existe un documento con el mismo idUsuario, idProfesional.');
  return next(err);
});

export const AgendaModel = model(constants.nombreStore.agenda, AgendaSchema);
