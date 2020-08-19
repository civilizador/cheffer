// Defining abstract class which will describe which pattern should our errors follow:
export abstract class CustomError extends Error {
    
    // Any Error subClass should have "statusCode" property which is a number
    abstract statusCode: number;

    constructor() {
        super();
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    // it also should have abstract method:  serializeErrors.
    // It must return array of objects where each object should have "message" and optional "field" properties 
    abstract serializeErrors(): {
        message: string;
        field?: string
    }[]
}