// Importing standart libraries
import express from 'express';
import {json} from 'body-parser';
import 'express-async-errors';
import cookieSession from "cookie-session";
// THe Application libraries
import {currentUserRouter} from './routes/current-user'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {signinRouter} from './routes/signin'
import {errorHandler} from './middlewares/error-handler'


// Exporting Error message to send when user tries to reach page that do not exists
import {NotFoundError} from './errors/not-found-error'


const app = express()
app.set('trust proxy', true);
app.use(json());

app.use(cookieSession({
    signed: false,
    // If we are NOT in a test env set to true.
    // In other words if Production secure: true.
    // If not production then set to false
    secure: process.env.NODE_ENV !== 'test'
}))

// Get User route
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

// If the defined routes matched create a new NotFoundError error.
// Express will capture a new Error event and pass it to errorHandler.
// app.all means that all methods will match (GET, POST, UPDATE)
app.all('*',(req,res,next) => {
    next(new NotFoundError());
})

app.use(errorHandler);

export { app };