import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

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
  ],
  fechaCreacion: Date.now,
};

const AgendaSchema = new Schema({
  idProfesional: { type: String, required: true, unique: true, },
  infoSemana: { type: Array as any, required: false, default: defaultValue.infoSemana, },
  fechaCreacion: { type: Date, required: false, default: defaultValue.fechaCreacion, },
}, { versionKey: false });

export const AgendaModel = model(constants.nombreStore.agenda, AgendaSchema);
