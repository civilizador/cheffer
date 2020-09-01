// Importing our CustomError abstract class 
// Which defines how output of any error should be in our APP.
import {CustomError} from './custom-error'

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    constructor(){
        super('Not Authorized. Please login to an appropriate account.');
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors() {
        return [
            {message: 'Not Authorized. Please login to an appropriate account.'}
        ]
    }
}