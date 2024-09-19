import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';

const defaultValue = {
  infoSemana: [
    {
      dia: 'lunes',
      esDiaLaboral: true,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'martes',
      esDiaLaboral: true,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'miercoles',
      esDiaLaboral: true,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'jueves',
      esDiaLaboral: true,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'viernes',
      esDiaLaboral: true,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'sabado',
      esDiaLaboral: false,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
    {
      dia: 'domingo',
      esDiaLaboral: false,
      atencion: {
        horaInicio: '07:00',
        horaFin: '18:00'
      },
    },
  ],
  estado: 'habilitado',
};

export const ConfigAgendaLocalSchema = new Schema({
  idAgenda: { type: String, required: true },
  idLocal: { type: String, required: true, unique: true },
  infoSemana: [{ type: Object, required: false, default: defaultValue.infoSemana }],
  // estado: { type: String, required: false, default: defaultValue.estado },
}, { versionKey: false });

export const ConfigAgendaLocalModel = model(constants.nombreStore.configAgendaLocal, ConfigAgendaLocalSchema);
