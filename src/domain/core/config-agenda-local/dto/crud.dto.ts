import { IConfigAgendaLocalOpcional } from '@global/models/ag_agenda';

export interface CrearConfigAgendaLocalDTO {
  configAgendaLocal: IConfigAgendaLocalOpcional;
};

export interface BuscarConfigAgendaLocalDTO {
  _id?: string;
  agendaLocal?: {
    idAgenda: string;
    idLocal: string;
  },
};

export interface ActualizarConfigAgendaLocalDTO {
  buscarPor: BuscarConfigAgendaLocalDTO;
  actualizado: IConfigAgendaLocalOpcional;
};
