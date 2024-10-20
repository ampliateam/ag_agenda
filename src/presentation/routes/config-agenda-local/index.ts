import { Router } from 'express';
import { mwVerificarPS } from '@presentation/_middlewares';
import * as cfp from '@presentation/endpoints/config-agenda-local';

const router = Router();

router.get('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.obtenerCAL.list
]);

router.post('/', [
  mwVerificarPS({ tps: ['persona'] }),
  ...cfp.crearCAL.list
]);

export default router;