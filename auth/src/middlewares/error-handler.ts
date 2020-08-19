import {Request, Response, NextFunction} from 'express';
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        // We Will respond to user with appropriate Subclass error message 

        // If the error is a type of RequestValidationError we will send the error for this case back to the user
        // The error will be generated in database-connection-errors.ts file
        if(err instanceof RequestValidationError){          
            return res.status(err.statusCode).send({ errors: err.serializeErrors() })
        }

        // If the error is a type of DatabaseConnectionError we will send the error for this case back to the user
        // The error will be generated in database-connection-errors.ts file
        if(err instanceof DatabaseConnectionError){
            return res.status(err.statusCode).send({errors: err.serializeErrors() })
        }

        // If the error is a type of ANYTHING ELSE besides 2 above we will format it accordingly 
        // and send back to the user in the response
        res.status(400).send({
            errors: [{
                message: "Something is wrong: "+err
            }]
        })
}