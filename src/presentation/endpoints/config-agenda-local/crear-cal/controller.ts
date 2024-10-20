import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const crearCAL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dto } = req.personalizado.extra;

    const cal = await services.core.configAgendaLocal.crud.crear({
      configAgendaLocal: {
        idAgenda: dto.idAgenda,
        idLocal: dto.idLocal,
      }
    });

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se creo el cal de forma correcta.',
      resultado: cal,
    });

    res.status(200).json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}