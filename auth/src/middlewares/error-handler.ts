import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        // We Will respond to user with appropriate Subclass error message 
        if(err instanceof RequestValidationError){
            console.log("Form Falidation Failed. Check email or password")
        }
        if(err instanceof DatabaseConnectionError){
            console.log("DB connection Failed.")
        }
        res.status(400).send({
            message: err.message
        })
}