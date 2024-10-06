import { manejadorDeErrorAgendalia } from "@domain/_errors";
import { VerificarUsuarioPersonaDTO, VerificarUsuarioExternoDTO } from "../dto";
import * as axios from "@domain/_connections/axios";
import { IAutenticacionExterno, IAutenticacionPersona, IUsuario } from "@global/models/ag_usuario";

// Referenciar el manejador de error correspondiente
const manejadorDeError = manejadorDeErrorAgendalia;

export const verificarUsuarioPersona = async (dto: VerificarUsuarioPersonaDTO) => {
  try {
    const { token } = dto;

    const response = await axios.ag_usuario.post('/auth/verificar-persona', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return {
      tipo: response.data.resultado.tipo as string,
      usuario: response.data.resultado.usuario as IUsuario,
      persona: {
        autenticacion: response.data.resultado.persona.autenticacion as IAutenticacionPersona,
        token: response.data.resultado.persona.token as string,
      }
    };
  } catch (error) {
    return manejadorDeError(error);
  }
};

export const verificarUsuarioExterno = async (dto: VerificarUsuarioExternoDTO) => {
  try {
    const { publicKey, timestamp, signature } = dto;

    const response = await axios.ag_usuario.post('/auth/verificar-externo', {}, {
      headers: {
        'X-Public-Key': publicKey,
        'X-Timestamp': timestamp,
        'X-Signature': signature,
      }
    });

    return {
      tipo: response.data.resultado.tipo as string,
      usuario: response.data.resultado.usuario as IUsuario,
      externo: {
        autenticacion: response.data.resultado.externo.autenticacion as IAutenticacionExterno,
        identificacion: {
          publicKey: response.data.resultado.externo.identificacion.publicKey as string,
          timestamp: response.data.resultado.externo.identificacion.timestamp as number,
          signature: response.data.resultado.externo.identificacion.signature as string,
        },
      }
    };
  } catch (error) {
    console.log(error);
    return manejadorDeError(error);
  }
};
