export class DatabaseConnectionError extends Error {
    // For DB connection errors we will define static error message to display
    reason = 'Error connecting to the Database'
    statusCode = 500;
    // No need for separate class here but just to be consistent with other error subclasses we will define it as well
    constructor(){
        super()
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    // We will define a method that will format error output to common pattern :
    // Array of objects, each object of which will have "message property and possibly "field" propery:
    // {errors:{message:string, field?: string}[]}
    serializeErrors(){
        return [
            {   message: this.reason  }
        ]
    }
}