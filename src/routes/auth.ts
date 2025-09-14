import { Router } from 'express';
import Controllers from '../controllers/controllers';

const authRouter = Router();

authRouter.get('/login', Controllers.auth.login);

export default authRouter;