import { TAgendamientoTipo, TAgendamientoEstado } from '@global/models/types';

// Modelo helper
type TEncuentro = {
  tipo: 'virtual' | 'local' | 'personalizado',
  idLocal: string | null,
  direccion: {
    referencia: string;
    ubicacion: [number, number] | null;
  } | null,
  enlace: string | null,
};

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
