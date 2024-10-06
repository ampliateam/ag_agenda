import { IConfigAgendaLocal } from '@global/models/ag_agenda';
import {
  CrearConfigAgendaLocalDTO,
  BuscarConfigAgendaLocalDTO,
  ActualizarConfigAgendaLocalDTO,
} from '../dto';
import * as repository from '../repository/mongodb';

export const crear = async (dto: CrearConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  return await repository.crud.crear(dto);
};

export const obtener = async (dto: BuscarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  return await repository.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  return await repository.crud.actualizar(dto);
};
