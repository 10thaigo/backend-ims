import db from '../utils/db';
import { reservationSchema, ReservationType } from '../schemas/reservation';

const TABLE_NAME = 'reservation';

export default class Reservation {
    static async add(reservation: ReservationType) {
        try {
            const [id] = await db<ReservationType>(TABLE_NAME)
                .insert(reservation);

            return await this.get(id);
        } catch (err: any) {

        }
    }

    static async get(id: number) {
        try {
            const reservation = await db<ReservationType>(TABLE_NAME)
                .where({ id })
                .first();
            if (!reservation) {
                return
            }
            return await reservationSchema.parseAsync(reservation);
        } catch (err: any) {
            
        }
    }

    static async del(id: number) {
        try {
            const deletedRows = await db<ReservationType>(TABLE_NAME)
                .where({ id })
                .del();
            
            return deletedRows;
        } catch(err: any) {

        }
    }
}