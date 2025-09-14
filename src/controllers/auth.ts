import { employeeSchema } from 'schemas/employee';
import Models from '../models/models';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default class AuthController {
    static async login(req: Request, res: Response) {
        console.log('Login attempt with query:', req.query);
        try{
            const schema = employeeSchema.pick({user: true, pass: true})
            const { user, pass } = await schema.parseAsync(req.query);

            console.log('Parsed user:', user);
            console.log('Parsed pass:', pass);

            const employee = await Models.employee.getByUser(user);

            if(!employee || employee.pass != pass){
                return res.status(401).json({ error: 'El usuario o la contraseña son incorrectos.' });
            }

            const token = jwt.sign(
                { id: employee.id }, 
                process.env.JWT_SECRET as string
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600*1000
            });

            return res.json({ message: 'Logeado correctamente' });

        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}