import { IAgendamiento } from '@global/models/ag_agenda';
import {
  CrearAgendamientoDTO,
  BuscarAgendamientoDTO,
  ActualizarAgendamientoDTO,
} from '../dto';
import * as repository from '../repository/mongodb';

export const crear = async (dto: CrearAgendamientoDTO): Promise<IAgendamiento> => {
  return await repository.crud.crear(dto);
};

export const obtener = async (dto: BuscarAgendamientoDTO): Promise<IAgendamiento> => {
  return await repository.crud.obtener(dto);
};

export const actualizar = async (dto: ActualizarAgendamientoDTO): Promise<IAgendamiento> => {
  return await repository.crud.actualizar(dto);
};
