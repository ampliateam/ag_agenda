import { TAgendaInfoSemana } from '@global/models/ag_agenda';

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
