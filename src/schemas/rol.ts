import { z } from "zod";

export const rolSchema = z.object({
    id: z.number(),
    name: z.string()
});

export type RolType = z.infer<typeof rolSchema>;