import { Router } from 'express';
import ProductController from 'controllers/product';

const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);
productsRouter.post('/', ProductController.add);
productsRouter.get('/:code', ProductController.get);
productsRouter.put('/', ProductController.update);
productsRouter.delete('/:code', ProductController.del);

export default productsRouter;