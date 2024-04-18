import { AgendamientoModel } from "@domain/_connections/mongodb";
import { mongoToAgendamiento } from "@domain/_helpers";

export const obtenerListaPorID = async (listaId: string[]) => {
  const filtros = {};
  const or = [];
  listaId.map((id) => or.push({ _id: id }));
  filtros["$or"] = or;

  const listaMongo = await AgendamientoModel.find(filtros);
  return listaMongo.map((v) => mongoToAgendamiento(v));
};
