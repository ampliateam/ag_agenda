import { IConfigAgendaLocalOpcional } from '@global/models/interfaces';

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
