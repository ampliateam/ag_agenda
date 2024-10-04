import { ConfigAgendaLocalModel } from '@domain/_connections/mongodb';
import { manejadorDeErrorMongodb } from '@domain/_errors';
import { mongoToConfigAgendaLocal } from '@domain/_helpers';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb 'pago-por-uso'
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await ConfigAgendaLocalModel.find(filtros);
    return listaModelMongo.map(v => mongoToConfigAgendaLocal(v));
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await ConfigAgendaLocalModel.updateMany(filtros, data, opcionesAux);
    const actualizados = await ConfigAgendaLocalModel.find(filtros);
    return actualizados.map(p => {
      return Object.assign(mongoToConfigAgendaLocal(p), data);
    });
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtenerPorID = async (id: string) => {
  try {
    const modelMongo = await ConfigAgendaLocalModel.findById(id);
    return mongoToConfigAgendaLocal(modelMongo);
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    const actualizados = await ConfigAgendaLocalModel.find(filtros);
    await ConfigAgendaLocalModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
    return Object.assign(mongoToConfigAgendaLocal(actualizados[0]), data);
  } catch (error) {
    return manejadorDeError(error);
  }
};
