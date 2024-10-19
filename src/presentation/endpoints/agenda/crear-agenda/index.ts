import { verificarCreacion } from "./middleware";
import { crearAgenda } from "./controller";

export const list = [
  verificarCreacion,
  crearAgenda
];