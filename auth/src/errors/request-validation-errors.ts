import { ValidationError } from 'express-validator';
// Importing our CustomError abstract class that defines a pattern for RequestValidationError .
import {CustomError} from './custom-error'

// Creating a new subclass of RequestValidationError to use it whenever Validation Error ocures
export class RequestValidationError extends CustomError {
    // defining error code for that particular error :
    statusCode = 400;
    // private replace the need of declaring this.errors = errors
    // We are saving the array of errors we got back from ValidationError array 
    // from express-validator middleware to "errors"
    constructor(public errors: ValidationError[]){
        super('Invalid request parameters');
        // Build in class extention requires following:
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
     // We will define a method that will format error output to common pattern :
    // Array of objects, each object of which will have "message property and possibly "field" propery:
    // {errors:{message:string, field?: string}[]}
    serializeErrors(){
        return this.errors.map((err)=>{
            return {    message: err.msg, field: err.param  }
        })  
    }
}