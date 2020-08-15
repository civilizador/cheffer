import { ValidationError } from 'express-validator';

// Creating a new subclass of RequestValidationError to use it whenever Validation Error ocures
export class RequestValidationError extends Error {
    // private replace the need of declaring this.errors = errors
    // We are saving the array of errors we got back from ValidationError array 
    // from express-validator middleware to "errors"
    constructor(public errors: ValidationError[]){
        super();
        // Build in class extention requires following:
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}