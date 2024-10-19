import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const crearAgenda = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dto } = req.personalizado.extra;

    const agenda = await services.core.agenda.crud.crear({
      agenda: {
        idProfesional: dto.idProfesional,
      }
    });

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se creo el agenda de forma correcta.',
      resultado: agenda,
    });

    res.status(200).json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}