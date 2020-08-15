export class DatabaseConnectionError extends Error {
    // For DB connection errors we will define static error message to display
    reason = 'Error connecting to the Database'

    // No need for separate class here but just to be consistent with other error subclasses we will define it as well
    constructor(){
        super()
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

}