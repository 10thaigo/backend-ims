import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        (req as any).user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado' });
    }
}