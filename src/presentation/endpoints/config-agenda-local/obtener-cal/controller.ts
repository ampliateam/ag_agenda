import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";
import { generarErrorCapaPresentation } from "@presentation/_errors";

export const obtenerCAL = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      _id,
      idAgenda,
      idLocal
    } = req.query;

    const filtro = {};
    if (_id) filtro['_id'] = _id
    else if (idAgenda && idLocal) filtro['agendaLocal'] = {
      idAgenda: idAgenda,
      idLocal: idLocal,
    }
    else {
      throw generarErrorCapaPresentation({
        estado: 400, 
        codigo: 'faltan_datos', 
        mensajeServidor: 'No hay datos de [_id] o [idProfesional] para realizar la busqueda.', 
        mensajeCliente: 'No hay datos para realizar la busqueda.', 
        resultado: null
      });
    };
    const agenda = await services.core.configAgendaLocal.crud.obtener(filtro);
    if (!agenda) {
      const respuestaServidor = generarRespuestaServidor({
        exito: true,
        mensaje: 'No existe la Agenda.',
        resultado: null,
      });

      return res.json(respuestaServidor);
    }

    // Elimiar datos sencibles
    // ...

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se obtuvo la agenda de forma correcta.',
      resultado: agenda,
    });

    return res.json(respuestaServidor);
  } catch (error) {
    return next(error);
  }
}
