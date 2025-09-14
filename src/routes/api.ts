import { Router } from 'express';
import productsRouter from './products';

const apiRouter = Router();

apiRouter.get('/', (_, res) => {
    res.send('API is working');
});

apiRouter.use('/products', productsRouter);

export default apiRouter;