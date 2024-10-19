import { manejadorDeErrorAgendalia } from "@domain/_errors";
import * as axios from "@domain/_connections/axios";
import { IAutenticacionExterno, IAutenticacionPersona, IUsuario } from "@global/models/ag_usuario";
import { ICredencialUsuario } from "@global/models/_system";
import { formatearCredencialesHeaders } from "@domain/_helpers";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorAgendalia;

export const verificarUsuarioPersona = async (cu: ICredencialUsuario) => {
  try {
    const credencialHeaders = formatearCredencialesHeaders(cu);
    const response = await axios.ag_usuario.post('/auth/verificar-persona', {}, {
      headers: { ...credencialHeaders }
    });

    const ps = response.data.resultado;
    return {
      cu: ps.cu as ICredencialUsuario,
      usuario: ps.usuario as IUsuario,
      autenticacionPersona: ps.autenticacionPersona as IAutenticacionPersona,
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const verificarUsuarioExterno = async (cu: ICredencialUsuario) => {
  try {
    const credencialHeaders = formatearCredencialesHeaders(cu);
    const response = await axios.ag_usuario.post('/auth/verificar-externo', {}, {
      headers: { ...credencialHeaders }
    });

    const ps = response.data.resultado;
    return {
      cu: ps.cu as ICredencialUsuario,
      usuario: ps.usuario as IUsuario,
      autenticacionExterno: ps.autenticacionExterno as IAutenticacionExterno,
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};