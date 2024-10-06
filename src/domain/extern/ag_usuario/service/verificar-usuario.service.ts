import { VerificarUsuarioPersonaDTO, VerificarUsuarioExternoDTO } from '../dto';
import * as repository from '../respository';

export const verificarUsuarioPersona = async (dto: VerificarUsuarioPersonaDTO) => {
    return repository.verificarUsuarioPersona(dto);
};

export const verificarUsuarioExterno = async (dto: VerificarUsuarioExternoDTO) => {
    return repository.verificarUsuarioExterno(dto);
};
