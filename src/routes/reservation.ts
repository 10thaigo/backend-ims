import { Router } from 'express';
import ReservationController from 'controllers/reservation';

const reservationRouter = Router();

reservationRouter.get('/:id', ReservationController.get);
reservationRouter.post('/', ReservationController.add);
reservationRouter.delete('/:id', ReservationController.del);

export default reservationRouter;