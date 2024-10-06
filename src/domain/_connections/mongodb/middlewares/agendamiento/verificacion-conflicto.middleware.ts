import { IAgendamiento } from "@global/models/ag_agenda/interfaces";

export async function verificarConflictoAgendamientoOpGuardar(ctx: any) {
  const model = ctx.model();
  let msgError = '';
  
  // Verifica si es un documento nuevo o si los campos relevantes han sido modificados
  const verificar = ctx.isNew
  || ctx.isModified('agendamientoInicio')
  || ctx.isModified('agendamientoFin')
  || ctx.isModified('estado');
  
  if (verificar) {    
    const overlappingAppointment = await model.findOne({
      idProfesional: ctx.idProfesional,
      _id: { $ne: ctx._id },  // Excluye el documento actual en caso de actualización
      estado: { $in: ['pendiente', 'confirmado'] },
      $or: [
        { agendamientoInicio: { $gt: ctx.agendamientoInicio, $lt: ctx.agendamientoFin } },
        { agendamientoFin: { $gt: ctx.agendamientoInicio, $lt: ctx.agendamientoFin } },
        {
          $and: [
            { agendamientoInicio: { $lte: ctx.agendamientoInicio } },
            { agendamientoFin: { $gte: ctx.agendamientoFin } }
          ]
        }
      ]
    });
    
    if (overlappingAppointment) {
      msgError = 'No se puede agendar en este horario debido a un conflicto con otro agendamiento.';
      throw new Error(msgError);
    }
  }
};

export async function verificarConflictoAgendamientoOpActualizar(ctx: any) {
  const model = ctx.model;
  let msgError = '';
  
  const update = ctx.getUpdate() as IAgendamiento;
  if (update?.agendamientoInicio || update?.agendamientoFin || update?.estado) {
    if (update.estado === 'eliminado') return;
    
    const doc = await model.findOne(ctx.getQuery());
    if (!doc) {
      msgError = 'Documento no encontrado';
      throw new Error(msgError);
    }
    
    const newStart = update.agendamientoInicio || doc.agendamientoInicio;
    const newEnd = update.agendamientoFin || doc.agendamientoFin;
    const newEstado = update.estado || doc.estado;

    const overlappingAppointment = await model.findOne({
      idProfesional: doc.idProfesional,
      _id: { $ne: doc._id },
      estado: { $in: ['pendiente', 'confirmado'] },
      $or: [
        { agendamientoInicio: { $gt: newStart, $lt: newEnd } },
        { agendamientoFin: { $gt: newStart, $lt: newEnd } },
        {
          $and: [
            { agendamientoInicio: { $lte: newStart } },
            { agendamientoFin: { $gte: newEnd } }
          ]
        }
      ]
    });

    if (overlappingAppointment && ['pendiente', 'confirmado'].includes(newEstado)) {
      msgError = 'No se puede agendar en este horario debido a un conflicto con otro agendamiento.';
      throw new Error(msgError);
    }
  }
};
