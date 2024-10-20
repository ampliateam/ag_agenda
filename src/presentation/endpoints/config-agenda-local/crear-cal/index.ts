import { verificarCreacion } from "./middleware";
import { crearCAL } from "./controller";

export const list = [
  verificarCreacion,
  crearCAL
];