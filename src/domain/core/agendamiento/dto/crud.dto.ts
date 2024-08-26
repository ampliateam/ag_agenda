import { IAgendamientoOpcional } from "@global/models/interfaces";

export interface CrearAgendamientoDTO {
  agendamiento: IAgendamientoOpcional;
}

export interface BuscarAgendamientoDTO {
  _id?: string;
  porProfesionalClienteyFecha?: {
    idProfesional: string;
    idCliente: string;
    agendamientoInicio: Date;
  };
}

export interface ActualizarAgendamientoDTO {
  buscarPor: BuscarAgendamientoDTO;
  actualizado: IAgendamientoOpcional;
}
