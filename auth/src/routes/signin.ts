import express, {Request,Response} from "express";
import {body} from 'express-validator';
import { User } from '../models/user';
import {Password} from "../services/password";
import {validateRequest} from "../middlewares/validateRequest";
import {BadRequestError} from "../errors/bad-request-error";
import jwt from "jsonwebtoken";


const router = express.Router()

router.post('/api/users/signin',
    // Express validator middleware
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must supply a correct password')
    ],
    // Request validator middleware
    validateRequest,
    async (req: Request,res: Response) => {
        // Extracting email and password from user request
        const { email, password} = req.body

        // Checking to see if user with provided email exists
        const existingUser = await User.findOne({ email });

        // If user doesn't exists throw an error 
        if(!existingUser){
            console.log("User with that email Doesnt Exists")
            throw new BadRequestError("User with that email Doesnt Exists")
        }

        // If user with provided email exists COMPARE PASWWORD from db to the one user supplied
        const passwordMatch = await Password.compare(
            existingUser.password,
            password
        );
        
        // If passwords didn't matched send an error.
        if(!passwordMatch){
            console.log(`Invalid credentials provided by user ${existingUser.email}`)
            throw new BadRequestError("Invalid credentials")
        }

        // If passwords DID match SignIn the user and send him JWT token:
        // Generate JWT 
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name
        }, process.env.JWT_KEY!);

        // Store generated JWT inside of the session object
        req.session = { 
            jwt: userJwt
        };

        res.status(200).send(existingUser)
        
    }
);

export { router as signinRouter }; 