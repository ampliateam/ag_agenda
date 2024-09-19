import { IAgenda } from '@global/models/interfaces';
import {
  CrearAgendaDTO,
  BuscarAgendaDTO,
  ActualizarAgendaDTO,
} from '../dto';
import * as repository from '../repository/mongodb';

export const crear = async (dto: CrearAgendaDTO): Promise<IAgenda> => {
  return await repository.crud.crear(dto);
};

export const obtener = async (dto: BuscarAgendaDTO): Promise<IAgenda> => {
  return await repository.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarAgendaDTO): Promise<IAgenda> => {
  return await repository.crud.actualizar(dto);
};
