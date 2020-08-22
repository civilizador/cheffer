import {CustomError} from './custom-error'

// Creating new class of error called BadRequestError.
// We will extend it with our generic CustomError class so our new class
// follow type annotatiions we specified in CustomError
// We will use this error class for multiple error types such as:
// User already exists and etc.

export class BadRequestError extends CustomError {
    statusCode = 500;

    constructor(public message: string){
        super(message)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(){
        return [{message: this.message}]
    }
}