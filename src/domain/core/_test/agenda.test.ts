import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

describe("CRUD - Agenda", () => {
  const idUsuario = "123456";
  const idProfesional = "000000000000000000000001";
  const idAgenda = "000000000000000000000000";

  beforeAll(async () => {
    await conexionConMongoDB();

    // Eliminamos los usuarios de prueba
    const agendaExistente = await services.core.agenda.crud.obtener({
      idUsuario,
    });
    if (agendaExistente) {
      await services.core.agenda.crud.eliminar({
        idUsuario
      });
    }

    // Crear un agenda
    const agendaNuevo = await services.core.agenda.crud.crear({
      agenda: {
        id: idAgenda,
        idUsuario,
        idProfesional,
        infoSemana: [
          {
            dia: "lunes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "martes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "miercoles",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "jueves",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "viernes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "sabado",
            esDiaLaboral: false,
            atencion: null,
            almuerzo: null,
          },
          {
            dia: "domingo",
            esDiaLaboral: false,
            atencion: null,
            almuerzo: null,
          },
        ],
        fechaCreacion: new Date(),
      },
    });

    expect(agendaNuevo.id).toEqual(idAgenda);
  });

  test("Obtener agenda", async () => {
    // Obtener agenda
    const agenda = await services.core.agenda.crud.obtener({ idUsuario });

    expect(agenda.id).toEqual(idAgenda);
  });
  test("Actualizar agenda", async () => {
    // Obtener agenda
    const agenda = await services.core.agenda.crud.actualizar({
      buscarPor: { id: idAgenda },
      actualizado: {
        infoSemana: [
          {
            dia: "lunes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "08:00",
              horaFin: "19:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "martes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "miercoles",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "jueves",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "viernes",
            esDiaLaboral: true,
            atencion: {
              horaInicio: "09:00",
              horaFin: "18:00"
            },
            almuerzo: {
              horaInicio: "12:00",
              horaFin: "13:00"
            },
          },
          {
            dia: "sabado",
            esDiaLaboral: false,
            atencion: null,
            almuerzo: null,
          },
          {
            dia: "domingo",
            esDiaLaboral: false,
            atencion: null,
            almuerzo: null,
          },
        ],
      }
    });

    expect(agenda.id).toEqual(idAgenda);
  });
});
