import { constants } from '@global/configs/constants';
import { ErrorCapaGlobal } from '@global/models/classes';
import { IErrorCapaGlobalOpcional } from '@global/models/interfaces';

export const generarErrorCapaDomain = (error: IErrorCapaGlobalOpcional): ErrorCapaGlobal => {
  return new ErrorCapaGlobal({
    ref: error.ref || `agendalia/${constants.codigoServicioPrincipal}/domain`,
    estado: error.estado || 500,
    codigo: error.codigo || 'error_desconocido',
    mensajeServidor: error.mensajeServidor || 'Error desconocido.',
    mensajeCliente: error.mensajeCliente || 'Error desconocido.',
    resultado: error.resultado || null,
  });
};
