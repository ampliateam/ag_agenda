import { TConfigAgendaLocalInfoSemana } from '../types';

// Modelo principal
export interface IConfigAgendaLocal {
  _id: string;
  idAgenda: string;
  idLocal: string;
  infoSemana: TConfigAgendaLocalInfoSemana[];
};

export interface IConfigAgendaLocalOpcional {
  _id?: string;
  idAgenda?: string;
  idLocal?: string;
  infoSemana?: TConfigAgendaLocalInfoSemana[];
};
