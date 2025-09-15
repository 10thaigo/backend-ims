import { Router } from 'express';
import productsRouter from './products';
import reservationRouter from './reservation';

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/reservations', reservationRouter);

export default apiRouter;