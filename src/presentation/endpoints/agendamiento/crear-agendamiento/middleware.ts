import { NextFunction, Request, Response } from "express";
import { validarDTO } from "@presentation/_helpers";
import { CrearAgendamientoDTO } from "./dto";

export const verificarCreacion = (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = new CrearAgendamientoDTO({
      idAgenda: req.body.idAgenda,
      idCliente: req.body.idCliente,
      idProfesional: req.body.idProfesional,
      idServicioProfesional: req.body.idServicioProfesional,
      idLocal: req.body.idLocal,
      tipo: req.body.tipo,
      nota: req.body.nota,
      encuentro: req.body.encuentro,
      agendamientoInicio: req.body.agendamientoInicio,
      agendamientoFin: req.body.agendamientoFin,
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