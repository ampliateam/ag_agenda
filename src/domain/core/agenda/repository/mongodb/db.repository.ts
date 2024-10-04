import { AgendaModel } from '@domain/_connections/mongodb';
import { manejadorDeErrorMongodb } from '@domain/_errors';
import { mongoToAgenda } from '@domain/_helpers';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb 'pago-por-uso'
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await AgendaModel.find(filtros);
    return listaModelMongo.map(v => mongoToAgenda(v));
  } catch (error) {
    return manejadorDeError(error)
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await AgendaModel.updateMany(filtros, data, opcionesAux);
    const actualizados = await AgendaModel.find(filtros);
    return actualizados.map(p => {
      return Object.assign(mongoToAgenda(p), data);
    });
  } catch (error) {
    return manejadorDeError(error)
  }
};

export const obtenerPorID = async (id: string) => {
  try {
    const modelMongo = await AgendaModel.findById(id);
    return mongoToAgenda(modelMongo);
  } catch (error) {
    return manejadorDeError(error)
  }
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    const actualizados = await AgendaModel.find(filtros);
    await AgendaModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
    return Object.assign(mongoToAgenda(actualizados[0]), data);
  } catch (error) {
    return manejadorDeError(error)
  }
};
