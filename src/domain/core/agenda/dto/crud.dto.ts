import { IAgendaOpcional } from '@global/models/ag_agenda';

export interface CrearAgendaDTO {
  agenda: IAgendaOpcional;
};

export interface BuscarAgendaDTO {
  _id?: string;
  idProfesional?: string;
};

export interface ActualizarAgendaDTO {
  buscarPor: BuscarAgendaDTO;
  actualizado: IAgendaOpcional;
};
