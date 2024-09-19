import { ConfigAgendaLocalModel } from '@domain/_connections/mongodb';
import { mongoToConfigAgendaLocal } from '@domain/_helpers';

// Tener cuidado mientras se use el plan de mongodb 'pago-por-uso'
export const obtener = async (filtros: any) => {
  const listaModelMongo = await ConfigAgendaLocalModel.find(filtros);
  return listaModelMongo.map(v => mongoToConfigAgendaLocal(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await ConfigAgendaLocalModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await ConfigAgendaLocalModel.find(filtros);
  return actualizados.map(p => {
    return Object.assign(mongoToConfigAgendaLocal(p), data);
  });
};

export const obtenerPorID = async (id: string) => {
  const modelMongo = await ConfigAgendaLocalModel.findById(id);
  return mongoToConfigAgendaLocal(modelMongo);
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  const actualizados = await ConfigAgendaLocalModel.find(filtros);
  await ConfigAgendaLocalModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
  return Object.assign(mongoToConfigAgendaLocal(actualizados[0]), data);
};
