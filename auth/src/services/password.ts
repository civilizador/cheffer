import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

//  Creating new Password class. 
//  Any time we need to create a new hash for password or check if User provided a correct hash 
//  WE will call these methods Password.toHash and Password.storedPassword 
//  Static methods are methods that are callable directly from the class 
//  and do not require to create a new instance of the class to call them.
export class Password {
    // Hashing provided password
    static async toHash(password: string){
        // Generating random string called (salt)
        const salt = randomBytes(10).toString('hex');
        // Because of the Typescript do not understand what output of scryptAsync is going to be,
        // we need to explicetly tell TS that result will be the type of Buffer
        const buf = (await scryptAsync(password, salt, 64) as Buffer);
        // Returning hashed password and salt separated by "."
        return `${buf.toString('hex')}.${salt}`;
    }
    //  Comparing user provided password to the one we have
    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

        return buf.toString('hex') === hashedPassword;
    }

}