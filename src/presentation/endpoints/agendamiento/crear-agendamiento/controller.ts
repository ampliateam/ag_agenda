import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";

export const crearAgendamiento = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { dto } = req.personalizado.extra;

    console.log(dto)

    const agendamiento = await services.core.agendamiento.crud.crear({
      agendamiento: {
        idAgenda: dto.idAgenda,
        idCliente: dto.idCliente,
        idProfesional: dto.idProfesional,
        idServicioProfesional: dto.idServicioProfesional,
        idLocal: dto.idLocal,
        tipo: dto.tipo,
        nota: dto.nota,
        encuentro: dto.encuentro,
        agendamientoInicio: dto.agendamientoInicio,
        agendamientoFin: dto.agendamientoFin,
        estado: 'pendiente',
        fechaCreacion: new Date(),
      }
    });

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se creo el agendamiento de forma correcta.',
      resultado: agendamiento,
    });

    res.status(200).json(respuestaServidor);
  } catch (error) {
    next(error);
  }
}