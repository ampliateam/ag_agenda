import { TAgendaInfoSemana } from '@global/models/types';

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
