import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe.skip("CRUD - agendamiento", () => {
  const ids = [
    ''
  ];
  const idUsuario = "000000";

  beforeAll(async () => {
    await conexionConMongoDB();
  });

  test('Crear agendamiento', async () => {
    // Creamos un nuevo servicio de agenda
    const agendamientoNuevo = await services.core.agendamiento.crud.crear({
      agendamiento: {
        idUsuarioProfesional: idUsuario,
        idProfesional: 'profesional0000000000000',
        idServicioProfesional: 'servicioprofesional0000',
        idCliente: 'cliente00000000000000000',
        idUsuarioCliente: null,
        tipo: "cliente",
        nota: "Pago se agendo",
        agendamientoInicio: new Date(),   // El cliente/profesional no pueden tener 2 o mas agendamientos confirmados solapados en horario 
        agendamientoFin: new Date(),      // Debe ser mayor a "agendamientoInicio"
        estado: "pendiente",
        fechaConfirmado: null,
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    expect(agendamientoNuevo).toBeTruthy();
  });

  test.skip("Obtener agendamiento", async () => {
    const _id = ids[0];

    // Obtenemos el servicio de un agenda
    const agendamiento = await services.core.agendamiento.crud.obtener({ _id });

    expect(agendamiento._id).toEqual(_id);
  });

  test.skip("Actualizar agendamiento", async () => {
    const _id = ids[0];
    const nota = 'QUE BUENA NOTA';

    // Obtenemos el servicio de un agenda
    const agendamiento = await services.core.agendamiento.crud.actualizar({
      buscarPor: { _id },
      actualizado: { nota }
    });

    expect(agendamiento._id).toEqual(_id);
    expect(agendamiento.nota).toEqual(nota);
  });

  test.skip("Eliminar agendamiento", async () => {
    const _id = ids[0];

    // Obtenemos el servicio de un agenda
    const agendamiento = await services.core.agendamiento.eliminarLogicamente({
      buscarPor: { _id },
      fechaEliminacion: new Date()
    });

    expect(agendamiento._id).toEqual(_id);
    expect(agendamiento.estado).toEqual('eliminado');
  });
});
