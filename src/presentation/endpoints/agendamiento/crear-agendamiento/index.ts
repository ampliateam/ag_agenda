import { verificarCreacion } from "./middleware";
import { crearAgendamiento } from "./controller";

export const list = [
  verificarCreacion,
  crearAgendamiento
];