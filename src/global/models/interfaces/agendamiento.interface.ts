import {
  TAgendamientoTipo,
  TAgendamientoEstado,
  TEncuentro
} from '@global/models/types';

// Modelo principal
export interface IAgendamiento {
  _id: string;
  idAgenda: string;
  idCliente: string | null;
  idProfesional: string;
  idServicioProfesional: string | null;
  idLocal: string | null;
  tipo: TAgendamientoTipo;
  nota: string | null;
  encuentro: TEncuentro;
  agendamientoInicio: Date;
  agendamientoFin: Date;
  estado: TAgendamientoEstado;
  fechaConfirmado: Date | null;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
};

export interface IAgendamientoOpcional {
  _id?: string;
  idAgenda?: string;
  idCliente?: string | null;
  idProfesional?: string;
  idServicioProfesional?: string | null;
  idLocal?: string | null;
  tipo?: TAgendamientoTipo;
  nota?: string | null;
  encuentro?: TEncuentro;
  agendamientoInicio?: Date;
  agendamientoFin?: Date;
  estado?: TAgendamientoEstado;
  fechaConfirmado?: Date | null;
  fechaCreacion?: Date;
  fechaEliminacion?: Date | null;
};
