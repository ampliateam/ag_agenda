import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';

const timeoutTest = 20 * 1000;

describe('CRUD - Agenda', () => {
  const idProfesional = '000000000000000000000002';
  const ids = [
    '66eb458332b6f862674afc57',
    '66eb45cfaa73b5667614fda5',
    '66eb45e83c0236ef80931558',
  ];

  beforeAll(async () => {
    await conexionConMongoDB();
  }, timeoutTest);

  test.skip('Crear agenda', async () => {
    // Crear un agenda
    const nuevo = await services.core.agenda.crud.crear({
      agenda: {
        idProfesional,
        infoSemana: [
          {
            dia: 'lunes',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'martes',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'miercoles',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'jueves',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'viernes',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'sabado',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
          {
            dia: 'domingo',
            recesos: [{
              nota: '',
              horaInicio: '09:00',
              horaFin: '18:00',
            }],
          },
        ],
        fechaCreacion: new Date(),
      },
    });

    expect(nuevo._id).toBeTruthy();
  }, timeoutTest);

  test.skip('Obtener agenda', async () => {
    const [
      dataCrud,
      [dataDb],
      listaDb,
    ] = await Promise.all([
      services.core.agenda.crud.obtener({ _id: ids[0] }),
      services.core.agenda.db.obtener({ _id: ids[1] }),
      services.core.agenda.db.obtener({ _id: { '$in': ids } }),
    ]);

    expect(dataCrud._id).toEqual(ids[0]);
    expect(dataDb._id).toEqual(ids[1]);
    listaDb.map(obj => {
      expect(ids).toContain(obj._id);
    });
  }, timeoutTest);

  test.skip('Actualizar agenda', async () => {
    const _id = ids[0];

    // Obtener agenda
    const actualizado = await services.core.agenda.crud.actualizar({
      buscarPor: { _id },
      actualizado: {
        infoSemana: [
          {
            dia: 'lunes',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'martes',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'miercoles',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'jueves',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'viernes',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'sabado',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
          {
            dia: 'domingo',
            recesos: [{
              nota: 'almuerzo',
              horaInicio: '12:00',
              horaFin: '14:00',
            }],
          },
        ],
      }
    });

    expect(actualizado._id).toEqual(_id);
  }, timeoutTest);
});
