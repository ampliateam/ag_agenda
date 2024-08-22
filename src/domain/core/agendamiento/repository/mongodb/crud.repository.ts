import { IAgendamiento } from "@global/models/interfaces";
import {
  ActualizarAgendamientoDTO,
  BuscarAgendamientoDTO,
  CrearAgendamientoDTO,
} from "../../dto";
import { AgendamientoModel } from "@domain/_connections/mongodb";
import { mongoToAgendamiento } from "@domain/_helpers";

export const crear = async (
  dto: CrearAgendamientoDTO
): Promise<IAgendamiento> => {
  const modelMongoDB = await AgendamientoModel.create(dto.agendamiento);
  return await obtener({ id: modelMongoDB.id });
};

export const obtener = async (
  dto: BuscarAgendamientoDTO
): Promise<IAgendamiento> => {
  // Proceso de filtracion
  const filtros: any = {};
  if (dto.id) {
    filtros._id = dto.id;
  } else if (dto.porProfesionalClienteyFecha) {
    filtros.idProfesional = dto.porProfesionalClienteyFecha.idProfesional;
    filtros.idCliente = dto.porProfesionalClienteyFecha.idCliente;
    filtros.agendamientoInicio =
      dto.porProfesionalClienteyFecha.agendamientoInicio;
  } else return null;

  // Obtener todos los servicios agendaes que tengan estado "habilitado" O "deshabilitado"
  filtros["$or"] = [
    { estado: "pendiente" },
    { estado: "confirmado" },
    { estado: "cancelado" },
    { estado: "cancelado-por-profesional" },
  ];

  const modelMongoDB = await AgendamientoModel.findOne(filtros);
  if (!modelMongoDB) return null;
  return mongoToAgendamiento(modelMongoDB);
};

export const actualizar = async (
  dto: ActualizarAgendamientoDTO
): Promise<IAgendamiento> => {
  const agendamiento: IAgendamiento = await obtener(dto.buscarPor);
  if (!agendamiento) return null;

  await AgendamientoModel.updateOne(
    {
      _id: agendamiento.id,
    },
    dto.actualizado
  );

  return Object.assign(agendamiento, dto.actualizado);
};

