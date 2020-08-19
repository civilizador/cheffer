import {Request, Response, NextFunction} from 'express';
import {CustomError} from '../errors/custom-error'

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        // We Will respond to user with appropriate Subclass error message 
 
        // The error will be generated in  <error_type>.ts file inside of errors directory
        if(err instanceof CustomError){          
            return res.status(err.statusCode).send({ errors: err.serializeErrors() })
        }

        // If the error is a type of ANYTHING ELSE besides 2 above we will format it accordingly 
        // and send back to the user in the response
        res.status(400).send({
            errors: [{
                message: "Something is wrong: "+err
            }]
        })
}