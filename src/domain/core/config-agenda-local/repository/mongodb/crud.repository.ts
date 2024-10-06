import { IConfigAgendaLocal } from '@global/models/ag_agenda';
import {
  CrearConfigAgendaLocalDTO,
  ActualizarConfigAgendaLocalDTO,
  BuscarConfigAgendaLocalDTO,
} from '../../dto';
import { ConfigAgendaLocalModel } from '@domain/_connections/mongodb';
import { mongoToConfigAgendaLocal } from '@domain/_helpers';
import { manejadorDeErrorMongodb } from '@domain/_errors';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

const filtroParaObtenerUnRegistro = (buscarPor: BuscarConfigAgendaLocalDTO) => {
  const filtros: any = {};
  if (buscarPor._id) {
    filtros._id = buscarPor._id;
  } else if (buscarPor.agendaLocal) {
    filtros.idAgenda = buscarPor.agendaLocal.idAgenda;
    filtros.idLocal = buscarPor.agendaLocal.idLocal;
  } else return null;

  return filtros;
};

export const crear = async (dto: CrearConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  try {
    const modelMongoDB = await ConfigAgendaLocalModel.create(dto.configAgendaLocal);
    return await obtener({ _id: modelMongoDB._id.toString() });
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtener = async (dto: BuscarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  try {
    // Proceso de filtracion
    const filtros = filtroParaObtenerUnRegistro(dto);
    if (!filtros) return null;

    const modelMongoDB = await ConfigAgendaLocalModel.findOne(filtros);
    if (!modelMongoDB) return null;
    return mongoToConfigAgendaLocal(modelMongoDB);
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (dto: ActualizarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  try {
    // Proceso de filtracion
    const filtros = filtroParaObtenerUnRegistro(dto.buscarPor);
    if (!filtros) return null;

    const obj = await ConfigAgendaLocalModel.findOneAndUpdate(
      filtros,
      dto.actualizado,
      { new: true }
    );

    return mongoToConfigAgendaLocal(obj);
  } catch (error) {
    return manejadorDeError(error);
  }
};
