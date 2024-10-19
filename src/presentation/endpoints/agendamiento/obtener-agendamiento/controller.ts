import { NextFunction, Request, Response } from "express";
import { services } from "@domain/services";
import { generarRespuestaServidor } from "@presentation/_helpers";
import { generarErrorCapaPresentation } from "@presentation/_errors";

export const obtenerAgendamiento = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      _id,
      idProfesional,
      idCliente,
      agendamientoInicio,
    } = req.query;

    const filtro = {};
    if (_id) filtro['_id'] = _id
    else if (idProfesional && idCliente && agendamientoInicio) filtro['porProfesionalClienteyFecha'] = {
      idProfesional: idProfesional,
      idCliente: idCliente,
      agendamientoInicio: agendamientoInicio
    }
    else {
      throw generarErrorCapaPresentation({
        estado: 400, 
        codigo: 'faltan_datos', 
        mensajeServidor: 'No hay datos de [_id] o [porProfesionalClienteyFecha] para realizar la busqueda.', 
        mensajeCliente: 'No hay datos para realizar la busqueda.', 
        resultado: null
      });
    };
    const agendamiento = await services.core.agendamiento.crud.obtener(filtro);
    if (!agendamiento) {
      const respuestaServidor = generarRespuestaServidor({
        exito: true,
        mensaje: 'No existe la Agendamiento.',
        resultado: null,
      });

      return res.json(respuestaServidor);
    }

    // Elimiar datos sencibles
    // ...

    const respuestaServidor = generarRespuestaServidor({
      exito: true,
      mensaje: 'Se obtuvo la agendamiento de forma correcta.',
      resultado: agendamiento,
    });

    return res.json(respuestaServidor);
  } catch (error) {
    return next(error);
  }
}
