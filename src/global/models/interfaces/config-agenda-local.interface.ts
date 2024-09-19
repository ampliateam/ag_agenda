import {
  TInfoSemanaDia,
  // TConfigAgendaLocalEstado,
} from '../types';

// Modelo helper
type TConfigAgendaLocalInfoSemana = {
  dia: TInfoSemanaDia;
  esDiaLaboral: boolean;
  atencion: {
    horaInicio: string;
    horaFin: string;
  };
};

// Modelo principal
export interface IConfigAgendaLocal {
  _id: string;
  idAgenda: string;
  idLocal: string;
  infoSemana: TConfigAgendaLocalInfoSemana[];
  // estado: TConfigAgendaLocalEstado;
};

export interface IConfigAgendaLocalOpcional {
  _id?: string;
  idAgenda?: string;
  idLocal?: string;
  infoSemana?: TConfigAgendaLocalInfoSemana[];
  // estado?: TConfigAgendaLocalEstado;
};
