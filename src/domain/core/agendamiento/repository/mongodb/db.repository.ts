import { AgendamientoModel } from '@domain/_connections/mongodb';
import { mongoToAgendamiento } from '@domain/_helpers';

// Tener cuidado mientras se use el plan de mongodb 'pago-por-uso'
export const obtener = async (filtros: any) => {
  const listaModelMongo = await AgendamientoModel.find(filtros);
  return listaModelMongo.map(v => mongoToAgendamiento(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await AgendamientoModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await AgendamientoModel.find(filtros);
  return actualizados.map(p => {
    return Object.assign(mongoToAgendamiento(p), data);
  });
};

export const obtenerPorID = async (id: string) => {
  const modelMongo = await AgendamientoModel.findById(id);
  return mongoToAgendamiento(modelMongo);
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  const actualizados = await AgendamientoModel.find(filtros);
  await AgendamientoModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
  return Object.assign(mongoToAgendamiento(actualizados[0]), data);
};
