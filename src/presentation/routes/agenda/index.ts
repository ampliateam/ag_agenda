import { Router } from 'express';
import { mwVerificarPS } from '@presentation/_middlewares';
import * as cfp from '@presentation/endpoints/agenda';

const router = Router();

router.get('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.obtenerAgenda.list
]);

router.post('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.crearAgenda.list
]);

export default router;