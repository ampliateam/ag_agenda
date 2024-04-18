import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe("CRUD - agendamiento", () => {
  const id = "000000000000000000000000";
  const idUsuario = "123456";
  const idUsuarioProfesional = "000000000000000000000004";
  const idProfesional = "000000000000000000000001";
  const idServicioProfesional = "000000000000000000000000";

  beforeAll(async () => {
    await conexionConMongoDB();

    // Obtenemos el servicio de un agendamiento y eliminar si existe
    const agendamientoExistente = await services.core.agendamiento.crud.obtener(
      {
        id
      }
    );
    if (agendamientoExistente) {
      await services.core.agendamiento.crud.eliminarLogicamente(
        {
          buscarPor: { id },
          fechaEliminacion: new Date,
        }
      );
    }

    // Creamos un nuevo servicio de agenda
    const agendamientoNuevo = await services.core.agendamiento.crud.crear({
      agendamiento: {
        id,
        idUsuarioProfesional,
        idProfesional,
        idServicioProfesional,
        idCliente: idUsuario,
        idUsuarioCliente: null,
        tipo: "cliente",
        nota: "Pago se agendo",
        agendamientoInicio: new Date(),
        agendamientoFin: new Date(),
        estado: "pendiente",
        fechaConfirmado: null,
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    expect(agendamientoNuevo.id).toEqual(id);
  });

  test("Obtener agendamiento", async () => {
    // Obtenemos el servicio de un agenda
    const agendamiento = await services.core.agendamiento.crud.obtener({
      id,
    });

    expect(agendamiento.id).toEqual(id);
  });

  test("Actualizar agendamiento", async () => {
    // Obtenemos el servicio de un agenda
    const agendamiento = await services.core.agendamiento.crud.actualizar({
      buscarPor: { id },
      actualizado: {
        nota: "QUE BUENA NOTA",
      }
    });

    expect(agendamiento.id).toEqual(id);
  });

  test("Obtener lista servicio agendamiento", async () => {
    const listaId = ["000000000000000000000000"];

    // Obtener lista de servicios agendaes
    const lista = await services.core.agendamiento.obtenerListaPorID(listaId);

    // Si no existe ningun servicio agenda, verificar
    if (!lista.length) {
      return expect(lista.length).toEqual(0);
    }

    // Verificar lista de id de servicios agendaes
    for (const id of listaId) {
      expect(lista.find((v) => v.id === id)?.id || "").toEqual(id);
    }
  });
});
