export type TAgendamientoTipo = 'cliente' | 'horaLibre';

export type TAgendamientoEstado =
  | 'pendiente'
  | 'confirmado'
  | 'cancelado'
  | 'cancelado-por-profesional'
  | 'eliminado';

export type TEncuentro = {
  tipo: 'virtual' | 'local' | 'personalizado',
  idLocal: string | null,
  direccion: {
    referencia: string;
    ubicacion: [number, number] | null;
  } | null,
  enlace: string | null,
};
