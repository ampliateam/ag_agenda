import { AgendaModel } from "@domain/_connections/mongodb";
import { mongoToAgenda } from "@domain/_helpers";

// Tener cuidado mientras se use el plan de mongodb "pago-por-uso"
export const obtener = async (filtros: any) => {
  const listaModelMongo = await AgendaModel.find(filtros);
  return listaModelMongo.map(v => mongoToAgenda(v));
};

export const actualizar = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  await AgendaModel.updateMany(filtros, data, opcionesAux);
  const actualizados = await AgendaModel.find(filtros);
  return actualizados.map(p => {
    return Object.assign(mongoToAgenda(p), data);
  });
};

export const obtenerPorID = async (id: string) => {
  const modelMongo = await AgendaModel.findById(id);
  return mongoToAgenda(modelMongo);
};

export const actualizarPorID = async (filtros: any, data: any, opciones?: any) => {
  const opcionesAux = opciones || { new: true, runValidators: true };
  const actualizados = await AgendaModel.find(filtros);
  await AgendaModel.findByIdAndUpdate(actualizados[0]._id, data, opcionesAux);
  return Object.assign(mongoToAgenda(actualizados[0]), data);
};
