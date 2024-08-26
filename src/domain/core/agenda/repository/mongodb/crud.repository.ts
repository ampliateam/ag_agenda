import { IAgenda } from "@global/models/interfaces";
import {
  CrearAgendaDTO,
  ActualizarAgendaDTO,
  BuscarAgendaDTO,
} from "../../dto";
import { AgendaModel } from "@domain/_connections/mongodb";
import { mongoToAgenda } from "@domain/_helpers";

export const crear = async (
  dto: CrearAgendaDTO
): Promise<IAgenda> => {
  const modelMongoDB = await AgendaModel.create(dto.agenda);
  return await obtener({ _id: modelMongoDB._id.toString() });
};

export const obtener = async (
  dto: BuscarAgendaDTO
): Promise<IAgenda> => {
  // Proceso de filtracion
  const filtros: any = {};
  if (dto._id) {
    filtros._id = dto._id;
  } else if (dto.idUsuario) {
    filtros.idUsuario = dto.idUsuario;
  } else if (dto.idProfesional) {
    filtros.idProfesional = dto.idProfesional;
  } else return null;

  const modelMongoDB = await AgendaModel.findOne(filtros);
  if (!modelMongoDB) return null;
  return mongoToAgenda(modelMongoDB);
};

export const actualizar = async (
  dto: ActualizarAgendaDTO
): Promise<IAgenda> => {
  const agenda: IAgenda = await obtener(dto.buscarPor);
  if (!agenda) return null;

  await AgendaModel.updateOne(
    { _id: agenda._id },
    dto.actualizado
  );

  return Object.assign(agenda, dto.actualizado);
};
