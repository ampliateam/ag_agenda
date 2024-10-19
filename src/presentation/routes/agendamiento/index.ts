import { Router } from 'express';
import { mwVerificarPS } from '@presentation/_middlewares';
import * as cfp from '@presentation/endpoints/agendamiento';

const router = Router();

router.get('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.obtenerAgendamiento.list
]);

router.post('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.crearAgendamiento.list
]);

export default router;