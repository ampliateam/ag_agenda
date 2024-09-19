import { IAgendamiento } from '@global/models/interfaces';
import { EliminarLogicamenteAgendamientoDTO } from '../dto';
import * as repository from '../repository/mongodb';

export const eliminarLogicamente = async (dto: EliminarLogicamenteAgendamientoDTO): Promise<IAgendamiento> => {
    return await repository.crud.actualizar({
        buscarPor: dto.buscarPor,
        actualizado: {
            estado: 'eliminado',
            fechaEliminacion: dto.fechaEliminacion,
        },
    });
}
