import { IAgendamiento } from '@global/models/ag_agenda';
import * as repository from '../repository/mongodb';

export const obtener = async (dto: any): Promise<IAgendamiento[]> => {
  return await repository.db.obtener(dto);
};

export const actualizar = async (dto: any, data: any): Promise<IAgendamiento[]> => {
  const actualizados = await repository.db.actualizar(dto, data);
  return actualizados;
};

export const obtenerPorID = async (id: string) => {
  return await repository.db.obtenerPorID(id);
};

export const actualizarPorID = async (dto: any, data: any) => {
  const actualizado = await repository.db.actualizarPorID(dto, data);
  return actualizado;
};
