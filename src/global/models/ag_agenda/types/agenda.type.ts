export type TInfoSemanaDia =
  | 'lunes'
  | 'martes'
  | 'miercoles'
  | 'jueves'
  | 'viernes'
  | 'sabado'
  | 'domingo';

export type TAgendaInfoSemana = {
  dia: TInfoSemanaDia;
  recesos: {
    nota: string;
    horaInicio: string;
    horaFin: string;
  }[];
};
