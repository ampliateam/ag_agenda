import { Schema, model } from 'mongoose';
import { constants } from '@global/configs/constants';
import { IConfigAgendaLocal } from '@global/models/interfaces';
import { TConfigAgendaLocalInfoSemana } from '@global/models/types';

// Definir la interfaz para el documento
interface IConfigAgendaLocalMongoose extends Document, Omit<IConfigAgendaLocal, '_id'> {};

// Guardar el valor por defecto de cada campo aqui (para los required=false)
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
  ] as TConfigAgendaLocalInfoSemana[],
};

// Schema de mongoose
const ConfigAgendaLocalSchema = new Schema<IConfigAgendaLocalMongoose>({
  idAgenda: { type: String, required: true },
  idLocal: { type: String, required: true, unique: true },
  infoSemana: { type: [Object], required: false, default: defaultValue.infoSemana },
}, { versionKey: false });

export const ConfigAgendaLocalModel = model<IConfigAgendaLocalMongoose>(
  constants.nombreStore.configAgendaLocal,
  ConfigAgendaLocalSchema
);
