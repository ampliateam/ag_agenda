import { TInfoSemanaDia } from "./agenda.type";

export type TConfigAgendaLocalInfoSemana = {
  dia: TInfoSemanaDia;
  esDiaLaboral: boolean;
  atencion: {
    horaInicio: string;
    horaFin: string;
  };
};
