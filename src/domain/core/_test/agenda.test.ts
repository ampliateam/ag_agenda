import { conexionConMongoDB } from "@global/connections/mongodb.connection";
import { services } from "@domain/services";

const timeoutTest = 20 * 1000;

describe("CRUD - Agenda", () => {
  const ids = [
    '66ce8338fe104e4cdad2c66f',
    '66c8f27fc98c87a599b34676',
    '66c8f2abb708eed0ee9549fe',
  ];
  const idUsuario = "000002";

  beforeAll(async () => {
    await conexionConMongoDB();
  }, timeoutTest);

  test.skip('Crear agenda', async () => {
    // Crear un agenda
    const agendaNuevo = await services.core.agenda.crud.crear({
      agenda: {
        idUsuario,
        idProfesional: '000000000000000000000002',
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
            atencion: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
            almuerzo: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
          },
          {
            dia: "domingo",
            esDiaLaboral: false,
            atencion: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
            almuerzo: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
          },
        ],
        fechaCreacion: new Date(),
      },
    });

    expect(agendaNuevo._id).toBeTruthy();
  }, timeoutTest);

  test.skip("Obtener agenda", async () => {
    const _id = ids[0];

    // Obtener agenda
    const [
      agendaCrud,
      [agendaDb],
      agendas,
    ] = await Promise.all([
      services.core.agenda.crud.obtener({ _id }),
      services.core.agenda.db.obtener({ _id }),
      services.core.agenda.db.obtener({ _id: { '$in': ids } }),
    ]);

    expect(agendaCrud._id).toEqual(_id);
    expect(agendaDb._id).toEqual(_id);
    agendas.map(agenda => {
      expect(ids).toContain(agenda._id);
    });
  }, timeoutTest);

  test.skip("Actualizar agenda", async () => {
    const _id = ids[0];

    // Obtener agenda
    const agenda = await services.core.agenda.crud.actualizar({
      buscarPor: { _id },
      actualizado: {
        idProfesional: '000000000000000000000003',
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
            esDiaLaboral: false,
            atencion: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
            almuerzo: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
          },
          {
            dia: "sabado",
            esDiaLaboral: false,
            atencion: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
            almuerzo: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
          },
          {
            dia: "domingo",
            esDiaLaboral: false,
            atencion: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
            almuerzo: {
              horaInicio: "00:00",
              horaFin: "00:00"
            },
          },
        ],
      }
    });

    expect(agenda._id).toEqual(_id);
  }, timeoutTest);
});
