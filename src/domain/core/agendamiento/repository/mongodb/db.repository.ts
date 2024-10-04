import { AgendamientoModel } from '@domain/_connections/mongodb';
import { manejadorDeErrorMongodb } from '@domain/_errors';
import { mongoToAgendamiento } from '@domain/_helpers';

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorMongodb;

// Tener cuidado mientras se use el plan de mongodb 'pago-por-uso'
export const obtener = async (filtros: any) => {
  try {
    const listaModelMongo = await AgendamientoModel.find(filtros);
    return listaModelMongo.map(v => mongoToAgendamiento(v));
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    await AgendamientoModel.updateMany(filtros, data, opcionesAux);
    const actualizados = await AgendamientoModel.find(filtros);
    return actualizados.map(p => {
      return Object.assign(mongoToAgendamiento(p), data);
    });
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const obtenerPorID = async (id: string) => {
  try {
    const modelMongo = await AgendamientoModel.findById(id);
    return mongoToAgendamiento(modelMongo);
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  try {
    const opcionesAux = opciones || { new: true, runValidators: true };
    const actualizados = await AgendamientoModel.find(filtros);
    await AgendamientoModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
    return Object.assign(mongoToAgendamiento(actualizados[0]), data);
  } catch (error) {
    return manejadorDeError(error);
  }
};
