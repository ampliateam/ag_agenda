import { IAgendamiento } from "@global/models/interfaces";
import * as repository from "../repository";

export const obtenerListaPorID = async (
  listaId: string[]
): Promise<IAgendamiento[]> => {
  return await repository.obtenerListaPorID(listaId);
};
