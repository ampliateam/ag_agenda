import { conexionConMongoDB } from '@global/connections/mongodb.connection';
import { services } from '@domain/services';

describe('CRUD - agendamiento', () => {
  const ids = [
    '66eb88ad3b909773ec1d7bde',
    '66eb8b7ef00face8df2a491c',
    '66eb8b8e26a6a8f5fe74e1ed',
  ];

  beforeAll(async () => {
    await conexionConMongoDB();
  });

  test.skip('Crear agendamiento', async () => {
    const nuevo = await services.core.agendamiento.crud.crear({
      agendamiento: {
        idAgenda: '66eb458332b6f862674afc57',
        idCliente: 'cliente-0000000000000001',
        idProfesional: 'profesional-000000000000',
        idServicioProfesional: 'sp-000000000000000000000',
        idLocal: 'local-000000000000000000',
        tipo: 'cliente',
        nota: '',
        encuentro: {
          tipo: 'virtual',
          idLocal: null,
          direccion: { referencia: '', ubicacion: [0,0] },
          enlace: 'https://reunion.agendalia.la/reu/6f87ds6f78ds6786fd7f89d7f8s'
        },
        agendamientoInicio: new Date('2024-09-19T04:00:00Z'),
        agendamientoFin: new Date('2024-09-19T05:00:00Z'),
        estado: 'pendiente',
        fechaConfirmado: null,
        fechaCreacion: new Date(),
        fechaEliminacion: null,
      },
    });

    expect(nuevo).toBeTruthy();
  });

  test.skip('Obtener agendamiento', async () => {
    const [
      dataCrud,
      [dataDb],
      listaDb,
    ] = await Promise.all([
      services.core.agendamiento.crud.obtener({ _id: ids[0] }),
      services.core.agendamiento.db.obtener({ _id: ids[1] }),
      services.core.agendamiento.db.obtener({ _id: { '$in': ids } }),
    ]);

    expect(dataCrud._id).toEqual(ids[0]);
    expect(dataDb._id).toEqual(ids[1]);
    listaDb.map(obj => {
      expect(ids).toContain(obj._id);
    });
  });

  test.skip('Actualizar agendamiento', async () => {
    const _id = ids[0];
    const nota = 'QUE BUENA NOTA';
    const estado = 'confirmado';
    const agendamientoFin = new Date('2024-09-19T04:00:01Z');

    // Obtenemos el servicio de un agenda
    const actualizado = await services.core.agendamiento.crud.actualizar({
      buscarPor: { _id },
      actualizado: {
        nota,
        estado,
        agendamientoFin
      },
    });

    expect(actualizado._id).toEqual(_id);
    expect(actualizado.nota).toEqual(nota);
  });

  test.skip('Eliminar agendamiento', async () => {
    const _id = ids[2];

    // Obtenemos el servicio de un agenda
    const eliminado = await services.core.agendamiento.eliminarLogicamente({
      buscarPor: { _id },
      fechaEliminacion: new Date()
    });

    expect(eliminado._id).toEqual(_id);
    expect(eliminado.estado).toEqual('eliminado');
  });
});
