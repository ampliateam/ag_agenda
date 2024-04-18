import { TAgendaInfoSemanaDia } from "@global/models/types";

export interface IAgendaInfoSemanaAtencion {
  horaInicio: string;
  horaFin: string;
}

export interface IAgendaInfoSemanaAlmuerzo {
  horaInicio: string;
  horaFin: string;
}

export interface IAgendaInfoSemana {
  dia: TAgendaInfoSemanaDia;
  esDiaLaboral: boolean;
  atencion: IAgendaInfoSemanaAtencion;
  almuerzo: IAgendaInfoSemanaAlmuerzo;
}

export interface IAgenda {
  id: string;
  idUsuario: string;
  idProfesional: string;
  infoSemana: IAgendaInfoSemana[];
  fechaCreacion: Date;
}
