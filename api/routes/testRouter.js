import { Router } from 'express';

const infoRouter = Router();

infoRouter.get('/', async (_, res) => {
  res.send('TEST2');
});

export default infoRouter;
