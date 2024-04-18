import { TAgendamientoTipo, TAgendamientoEstado } from '@global/models/types';

export interface IAgendamiento {
  id: string;
  idUsuarioProfesional: string;
  idProfesional: string;
  idServicioProfesional: string | null;
  idCliente: string | null;
  idUsuarioCliente: string | null;
  tipo: TAgendamientoTipo;
  nota: string | null;
  agendamientoInicio: Date;
  agendamientoFin: Date;
  estado: TAgendamientoEstado;
  fechaConfirmado: Date | null;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
}