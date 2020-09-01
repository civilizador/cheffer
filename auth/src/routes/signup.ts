// LIBRARIES
import express from "express";
// We are importing Request and Response Classes form express to use them in type Annotations for req and res
import {Request,Response} from "express";
import jwt from 'jsonwebtoken';

// ERROR HANDLING
// Importing validation middleware
import {body} from "express-validator";
// For most of the request types we have BadRequestError class of errors:
import {BadRequestError} from '../errors/bad-request-error'
// Our middleware to validate requests from User
import {validateRequest} from '../middlewares/validateRequest'

// DB
// Importing User Model
import {User} from '../models/user'

const router = express.Router()

router.post('/api/users/signup',[
    // Middleware validation with express.validator 
    body('email')
        .isEmail()
        .withMessage('Email is not correct'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .isString()
        .withMessage('Password must be 4-20 characters long')
    ], 
    validateRequest,
    async (req: Request,res: Response) => {
        // Extracting email and password from the request
        const {email, password, name} = req.body;
        // Querying DB if it has entry for that email
        const existingUser = await User.findOne({ email });

        if(existingUser){
            console.log('User with that email already Exists')
            throw new BadRequestError('User with that email already Exists')
        }

        // If User doesn't exists go ahead and create a new user
        const user = User.build({email, password, name})
        await user.save();

        // Generate JWT 

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, process.env.JWT_KEY!);

        // Store generated JWT inside of the session object
        req.session = { 
            jwt: userJwt
        };

        res.status(201).send(user)
});

export { router as signupRouter }; 