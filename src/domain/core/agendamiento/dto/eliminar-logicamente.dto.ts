import { BuscarAgendamientoDTO } from "./crud.dto";

export interface EliminarLogicamenteAgendamientoDTO {
    buscarPor: BuscarAgendamientoDTO;
    fechaEliminacion: Date;
}
