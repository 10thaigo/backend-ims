import { z } from 'zod';

export const reservationSchema = z.object({
    id: z.coerce.number(),
    supplier: z.number(),
    receiver: z.number(),
    product: z.number(),
    date_provided: z.coerce.date(),
    date_returned: z.coerce.date().nullable(),
    status: z.number()
});

export type ReservationType = z.infer<typeof reservationSchema>;