import { z } from 'zod';

export const productSchema = z.object({
    code: z.coerce.number(),
    description: z.string(),
    stock: z.number()
});

export type ProductType = z.infer<typeof productSchema>;