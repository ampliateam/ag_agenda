import { IAgendamiento } from "@global/models/interfaces";
import {
  CrearAgendamientoDTO,
  BuscarAgendamientoDTO,
  ActualizarAgendamientoDTO,
} from "../dto";
import * as repository from '../repository/mongodb';
import { EliminarAgendamientoDTO } from "../dto";

export const crear = async (
  dto: CrearAgendamientoDTO
): Promise<IAgendamiento> => {
  return await repository.crud.crear(dto);
};

export const obtener = async (
  dto: BuscarAgendamientoDTO
): Promise<IAgendamiento> => {
  return await repository.crud.obtener(dto);
};

export const actualizar = async (
  dto: ActualizarAgendamientoDTO
): Promise<IAgendamiento> => {
  return await repository.crud.actualizar(dto);
};

export const eliminarLogicamente = async (dto: EliminarAgendamientoDTO): Promise<IAgendamiento> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion,
        },
    });
}
