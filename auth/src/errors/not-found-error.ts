// Importing our CustomError abstract class 
// Which defines how output of any error should be in our APP.
import {CustomError} from './custom-error'

export class NotFoundError extends CustomError{
    statusCode = 404

    constructor() {
        super('Page not found');
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(){
        return [{
            message: 'Not Found'
        }]
    }
}