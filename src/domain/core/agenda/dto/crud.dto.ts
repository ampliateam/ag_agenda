import { IAgenda } from "@global/models/interfaces";

export interface CrearAgendaDTO {
  agenda: IAgenda;
}

export interface BuscarAgendaDTO {
  id?: string;
  idUsuario?: string;
  idProfesional?: string;
}

export interface ActualizarAgendaDTO {
  buscarPor: BuscarAgendaDTO;
  actualizado: {
    infoSemana?: object;
  };
}
