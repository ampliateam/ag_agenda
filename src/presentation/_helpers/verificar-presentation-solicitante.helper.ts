import { generarErrorCapaPresentation } from '../_errors';
import { services } from '@domain/services';
import { ICredencialUsuario } from '@global/models/_system';

export const verificarPresentationSolicitante = async (cu: ICredencialUsuario) => {
  const respuesta = {
    usuario: null,
    autenticacionPersona: null,
    autenticacionExterno: null,
  };

  // Verificacion para caso de cliente desconocido
  if (cu.tipo === 'persona') {
    const { token } = cu.persona;
    
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
    const result = await services.extern.ag_usuario.verificarUsuarioPersona(cu);

    respuesta.autenticacionPersona = result.autenticacionPersona;
    respuesta.usuario = result.usuario;
  } else if (cu.tipo === 'externo') {
    const { publicKey, timestamp, signature } = cu.externo;

    // Verificaciones para caso de cliente persona/externo
    if (!publicKey || !timestamp || !signature) {
      throw generarErrorCapaPresentation({
        estado: 401,
        codigo: 'no_autorizado',
        mensajeServidor: `Se requiere publicKey, timestamp y signature para realizar la operación.`,
        mensajeCliente: `Se requieren las credenciales de externo para realizar la operación.`,
        resultado: null,
      });
    }

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
    const result = await services.extern.ag_usuario.verificarUsuarioExterno(cu);

    respuesta.autenticacionExterno = result.autenticacionExterno;
    respuesta.usuario = result.usuario;
  }

  return respuesta;
};
