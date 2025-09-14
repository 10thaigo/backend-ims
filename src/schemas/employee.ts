import { z } from 'zod';
//import { rolSchema } from './rol';

export const employeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    dni: z.number(),
    birthdate: z.date(),
    role: z.number(),
    user: z.string(),
    pass: z.string()
});

export type EmployeeType = z.infer<typeof employeeSchema>;