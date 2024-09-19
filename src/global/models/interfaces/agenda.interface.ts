import { TInfoSemanaDia } from '@global/models/types';

// Modelo helper
type TAgendaInfoSemana = {
  dia: TInfoSemanaDia;
  recesos: {
    nota: string;
    horaInicio: string;
    horaFin: string;
  }[];
};

// Modelo principal
export interface IAgenda {
  _id: string;
  idProfesional: string;
  infoSemana: TAgendaInfoSemana[];
  fechaCreacion: Date;
};

export interface IAgendaOpcional {
  _id?: string;
  idProfesional?: string;
  infoSemana?: TAgendaInfoSemana[];
  fechaCreacion?: Date;
};
