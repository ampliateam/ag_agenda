import { IAgendaOpcional } from "@global/models/interfaces";

export interface CrearAgendaDTO {
  agenda: IAgendaOpcional;
}

export interface BuscarAgendaDTO {
  _id?: string;
  idUsuario?: string;
  idProfesional?: string;
}

export interface ActualizarAgendaDTO {
  buscarPor: BuscarAgendaDTO;
  actualizado: IAgendaOpcional;
}
