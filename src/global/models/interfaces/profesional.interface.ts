import {
  TProfesionalContactoPrioridad,
  TProfesionalContactoTipo,
  TProfesionalEstado,
} from "@global/models/types";

export interface IProfesionalContacto {
  codigoAccesoInternacional: string | null;
  contacto: string;
  tipo: TProfesionalContactoTipo;
  prioridad: TProfesionalContactoPrioridad;
}

export interface IProfesionalDireccion {
  referencia: string;
  ubicacion: [number, number] | null;
}

export interface IProfesional {
  _id: string;
  idUsuario: string;
  contactos: IProfesionalContacto[];
  direccion: IProfesionalDireccion;
  estado: TProfesionalEstado;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
}
