export type TAgendamientoTipo = "cliente" | "horaLibre";

export type TAgendamientoEstado =
  | "pendiente"
  | "confirmado"
  | "cancelado"
  | "cancelado-por-profesional"
  | "eliminado";
