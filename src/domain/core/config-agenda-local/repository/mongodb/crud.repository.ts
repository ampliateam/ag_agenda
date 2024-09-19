import { IConfigAgendaLocal } from '@global/models/interfaces';
import {
  CrearConfigAgendaLocalDTO,
  ActualizarConfigAgendaLocalDTO,
  BuscarConfigAgendaLocalDTO,
} from '../../dto';
import { ConfigAgendaLocalModel } from '@domain/_connections/mongodb';
import { mongoToConfigAgendaLocal } from '@domain/_helpers';

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
  const modelMongoDB = await ConfigAgendaLocalModel.create(dto.configAgendaLocal);
  return await obtener({ _id: modelMongoDB._id.toString() });
};

export const obtener = async (dto: BuscarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  // Proceso de filtracion
  const filtros = filtroParaObtenerUnRegistro(dto);
  if (!filtros) return null;

  const modelMongoDB = await ConfigAgendaLocalModel.findOne(filtros);
  if (!modelMongoDB) return null;
  return mongoToConfigAgendaLocal(modelMongoDB);
};

export const actualizar = async (dto: ActualizarConfigAgendaLocalDTO): Promise<IConfigAgendaLocal> => {
  // Proceso de filtracion
  const filtros = filtroParaObtenerUnRegistro(dto.buscarPor);
  if (!filtros) return null;

  const obj = await ConfigAgendaLocalModel.findOneAndUpdate(
    filtros,
    dto.actualizado,
    { new: true }
  );

  return mongoToConfigAgendaLocal(obj);
};
