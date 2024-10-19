import { ICredencialUsuario } from '@global/models/_system';
import * as repository from '../respository';

export const verificarUsuarioPersona = async (cu: ICredencialUsuario) => {
    return repository.verificarUsuarioPersona(cu);
};

export const verificarUsuarioExterno = async (cu: ICredencialUsuario) => {
    return repository.verificarUsuarioExterno(cu);
};
