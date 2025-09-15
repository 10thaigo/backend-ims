import Models from '../models/models';
import { Request, Response } from 'express';
import { reservationSchema } from 'schemas/reservation';

export default class ReservationController {
    static async get(req: Request, res: Response) {
        try {
            const schema = reservationSchema.pick({ id: true });
            const { id } = await schema.parseAsync(req.params);
            const reservation = await Models.reservation.get(id);
            return res.status(200).json(reservation);
        } catch (error: any) {

        }
    }

    static async add(req: Request, res: Response) {
        try {
            const reservation = await reservationSchema.parseAsync(req.body);
            const newReservation = await Models.reservation.add(reservation);
            return res.status(201).json(newReservation);
        } catch (error: any) {

        }
    }

    static async del(req: Request, res: Response) {
        try {
            const schema = reservationSchema.pick({ id: true });
            const { id } = await schema.parseAsync(req.params);
            const deletedRows = await Models.reservation.del(id);
            return res.status(200).json({ deletedRows });
        } catch (error: any) {

        }
    }
}