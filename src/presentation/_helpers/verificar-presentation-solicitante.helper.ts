import { TPresentationSolicitanteTipo } from '@presentation/_models/types';
import { generarErrorCapaPresentation } from '../_errors';
import { services } from '@domain/services';

export const verificarPresentationSolicitante = async (psTipo: TPresentationSolicitanteTipo, dataAuth: any) => {
  const respuesta = {
    usuario: null,
    autenticacionPersona: null,
    autenticacionExterno: null,
  };

  // Verificacion para caso de cliente desconocido
  if (psTipo === 'persona') {
    const { token } = dataAuth;
    
    // Verificaciones para caso de cliente persona/externo
    if (!token) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Se requiere un token para realizar la operación.`,
        mensajeCliente: `Se requiere un token para realizar la operación.`,
        resultado: null,
      });
    }

    // Verificar firma del `usuario-persona`
    const result = await services.extern.ag_usuario.verificarUsuarioPersona({
      token
    });

    respuesta.autenticacionPersona = result.persona.autenticacion;
    respuesta.usuario = result.usuario;
  } else if (psTipo === 'externo') {
    const { publicKey, timestamp, signature } = dataAuth;

    if (timestamp >= Date.now()) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: 'El valor del `timestamp` tiene que ser menor al momento de la solicitud.',
        mensajeCliente: `No autorizado.`,
        resultado: null,
      });
    }

    // Verificar firma del `usuario-externo`
    const result = await services.extern.ag_usuario.verificarUsuarioExterno({
      publicKey,
      timestamp,
      signature,
    });

    respuesta.autenticacionExterno = result.externo.autenticacion;
    respuesta.usuario = result.usuario;
  }

  return respuesta;
};
