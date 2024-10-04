import { IAgenda } from '@global/models/interfaces';
import {
  CrearAgendaDTO,
  ActualizarAgendaDTO,
  BuscarAgendaDTO,
} from '../../dto';
import { AgendaModel } from '@domain/_connections/mongodb';
import { mongoToAgenda } from '@domain/_helpers';
import { manejadorDeErrorMongodb } from '@domain/_errors';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

const filtroParaObtenerUnRegistro = (buscarPor: BuscarAgendaDTO) => {
  const filtros: any = {};
  if (buscarPor._id) {
    filtros._id = buscarPor._id;
  } else if (buscarPor.idProfesional) {
    filtros.idProfesional = buscarPor.idProfesional;
  } else return null;

  return filtros;
};

export const crear = async (dto: CrearAgendaDTO): Promise<IAgenda> => {
  try {
    const modelMongoDB = await AgendaModel.create(dto.agenda);
    return await obtener({ _id: modelMongoDB._id.toString() });
  } catch (error) {
    return manejadorDeError(error)
  }
};

export const obtener = async (dto: BuscarAgendaDTO): Promise<IAgenda> => {
  try {
    // Proceso de filtracion
    const filtros = filtroParaObtenerUnRegistro(dto);
    if (!filtros) return null;

    const modelMongoDB = await AgendaModel.findOne(filtros);
    if (!modelMongoDB) return null;
    return mongoToAgenda(modelMongoDB);
  } catch (error) {
    return manejadorDeError(error)
  }
};

export const actualizar = async (dto: ActualizarAgendaDTO): Promise<IAgenda> => {
  try {
    // Proceso de filtracion
    const filtros = filtroParaObtenerUnRegistro(dto.buscarPor);
    if (!filtros) return null;

    const obj = await AgendaModel.findOneAndUpdate(
      filtros,
      dto.actualizado,
      { new: true }
    );
    return mongoToAgenda(obj);
  } catch (error) {
    return manejadorDeError(error)
  }
};
