import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';

const timeoutTest = 20 * 1000;

describe('CRUD - ConfigAgendaLocal', () => {
  const ids = [
    '66ec272e582c749ed9dd1a51',
    '66ec2a924cf587356e5dc7e3',
    '66ec2aa3431110f963457932',
  ];

  beforeAll(async () => {
    await conexionConMongoDB();
  }, timeoutTest);

  test.skip('Crear', async () => {
    const nuevo = await services.core.configAgendaLocal.crud.crear({
      configAgendaLocal: {
        idAgenda: '66eb458332b6f862674afc57',
        idLocal: 'local-000000000000000002',
        infoSemana: [
          {
            dia: 'lunes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'martes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'miercoles',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'jueves',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'viernes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'sabado',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'domingo',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
        ],
      }
    });

    expect(nuevo).toBeTruthy();
  }, timeoutTest);

  test.skip('Obtener', async () => {
    const [
      dataCrud,
      [dataDb],
      listaDb,
    ] = await Promise.all([
      services.core.configAgendaLocal.crud.obtener({ _id: ids[0] }),
      services.core.configAgendaLocal.db.obtener({ _id: ids[1] }),
      services.core.configAgendaLocal.db.obtener({ _id: { '$in': ids } }),
    ]);

    expect(dataCrud._id).toEqual(ids[0]);
    expect(dataDb._id).toEqual(ids[1]);
    listaDb.map(obj => {
      expect(ids).toContain(obj._id);
    });
  }, timeoutTest);

  test.skip('Actualizar', async () => {
    const _id = ids[0];

    const actualizado = await services.core.configAgendaLocal.crud.actualizar({
      buscarPor: { _id },
      actualizado: {
        infoSemana: [
          {
            dia: 'lunes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'martes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'miercoles',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'jueves',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'viernes',
            esDiaLaboral: true,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'sabado',
            esDiaLaboral: false,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
          {
            dia: 'domingo',
            esDiaLaboral: false,
            atencion: { horaInicio: '09:00', horaFin: '18:00' },
          },
        ],
      }
    });

    expect(actualizado._id).toEqual(_id);
  }, timeoutTest);
});
