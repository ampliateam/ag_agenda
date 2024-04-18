import { BuscarAgendamientoDTO } from "./crud.dto";

export interface EliminarAgendamientoDTO {
    buscarPor: BuscarAgendamientoDTO;
    fechaEliminacion: Date;
}
