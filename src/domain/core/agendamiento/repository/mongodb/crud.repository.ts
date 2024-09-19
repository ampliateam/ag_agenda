import { IAgendamiento } from '@global/models/interfaces';
import {
  ActualizarAgendamientoDTO,
  BuscarAgendamientoDTO,
  CrearAgendamientoDTO,
} from '../../dto';
import { AgendamientoModel } from '@domain/_connections/mongodb';
import { mongoToAgendamiento } from '@domain/_helpers';

const filtroParaObtenerUnRegistro = (buscarPor: BuscarAgendamientoDTO) => {
  const filtros: any = {};
  if (buscarPor._id) {
    filtros._id = buscarPor._id;
  } else if (buscarPor.porProfesionalClienteyFecha) {
    filtros.idProfesional = buscarPor.porProfesionalClienteyFecha.idProfesional;
    filtros.idCliente = buscarPor.porProfesionalClienteyFecha.idCliente;
    filtros.agendamientoInicio = buscarPor.porProfesionalClienteyFecha.agendamientoInicio;
  } else return null;

  // Obtener todos los servicios agendaes que tengan estado 'habilitado' O 'deshabilitado'
  filtros['$or'] = [
    { estado: 'pendiente' },
    { estado: 'confirmado' },
    { estado: 'cancelado' },
    { estado: 'cancelado-por-profesional' },
  ];

  return filtros;
};

export const crear = async (dto: CrearAgendamientoDTO): Promise<IAgendamiento> => {
  const modelMongoDB = await AgendamientoModel.create(dto.agendamiento);
  return await obtener({ _id: modelMongoDB._id.toString() });
};

export const obtener = async (dto: BuscarAgendamientoDTO): Promise<IAgendamiento> => {
  // Proceso de filtracion
  const filtros = filtroParaObtenerUnRegistro(dto);
  if (!filtros) return null;
  
  const modelMongoDB = await AgendamientoModel.findOne(filtros);
  if (!modelMongoDB) return null;
  return mongoToAgendamiento(modelMongoDB);
};

export const actualizar = async (dto: ActualizarAgendamientoDTO): Promise<IAgendamiento> => {
  // Proceso de filtracion
  const filtros = filtroParaObtenerUnRegistro(dto.buscarPor);
  if (!filtros) return null;

  const obj = await AgendamientoModel.findOneAndUpdate(
    filtros,
    dto.actualizado,
    { new: true }
  );

  return mongoToAgendamiento(obj);
};

