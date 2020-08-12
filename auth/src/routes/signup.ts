import express from "express";
// We are importing Request and Response Classes form express to use them in type Annotations for req and res
import {Request,Response} from "express";
// Importing validation middleware
import {body,validationResult} from "express-validator";

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
    (req: Request,res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).send(errors.array())
        }
        const { email,password} = req.body;
        res.send(`email: ${email} has been Registered with password: ${password}`)
});

export { router as signupRouter }; 