import { NextFunction, Request, Response } from "express";
import { validarDTO } from "@presentation/_helpers";
import { CrearCALDTO } from "./dto";

export const verificarCreacion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = new CrearCALDTO({
      idAgenda: req.body.idAgenda,
      idLocal: req.body.idLocal,
    });

    // Verificar DTO
    validarDTO(dto);

    // Realizar otras verificaciones
    // ...

    // Construir datos
    req.personalizado.extra.dto = dto.toObject();

    next();
  } catch (error) {
    next(error);
  }
};