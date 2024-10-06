import { Router } from 'express';
import { mwVerificarPS } from '@presentation/middlewares';

const router = Router();

router.post('/para-persona',
  mwVerificarPS({ tps: ['persona'] }),
  (req, res, next) => {
    try {
      res.send('Prueba para persona');
    } catch (error) {
      next(error);
    }
  }
);

router.post('/para-externo',
  mwVerificarPS({ tps: ['externo'] }),
  (req, res, next) => {
    try {
      res.send('Prueba para externo');
    } catch (error) {
      next(error);
    }
  }
);

export default router;