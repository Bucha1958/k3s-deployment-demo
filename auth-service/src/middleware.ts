import { Request, Response, NextFunction } from '../../general-service/node_modules/@types/express';
import jwt  from '../../general-service/node_modules/@types/jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};