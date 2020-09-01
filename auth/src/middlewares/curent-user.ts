import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

// Defining a new interface to describe "payload"
interface UserPayload {
    id: string;
    email: string;
    name: string
}

// Here we need to modify existing interface so we can add a new property to it.
// We will tell TypeScript that Request interface should also have :
// currentUser property which will be described by the UserPayload interface.
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session || !req.session.jwt){
        return next()
    }
    // Performing a check to see if we have valid jwt tocken.
    try{
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload
    }catch (err) {}

    next()
};
