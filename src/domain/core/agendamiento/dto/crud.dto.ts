import { TAgendamientoEstado } from "@global/models/types";
import { IAgendamiento } from "@global/models/interfaces";

export interface CrearAgendamientoDTO {
  agendamiento: IAgendamiento;
}

export interface BuscarAgendamientoDTO {
  id?: string;
  porProfesionalClienteyFecha?: {
    idProfesional: string;
    idCliente: string;
    agendamientoInicio: Date;
  };
}

export interface ActualizarAgendamientoDTO {
  buscarPor: BuscarAgendamientoDTO;
  actualizado: {
    nota?: string;
    agendamientoInicio?: Date;
    agendamientoFin?: Date;
    estado?: TAgendamientoEstado;
    fechaConfirmado?: Date;
    fechaEliminacion?: Date;
  };
}
