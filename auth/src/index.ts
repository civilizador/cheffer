// Importing standart libraries
import express from 'express'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import 'express-async-errors';
// THe Application libraries
import {currentUserRouter} from './routes/current-user'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {signinRouter} from './routes/signin'
import {errorHandler} from './middlewares/error-handler'

// Exporting Error message to send when user tries to reach page that do not exists
import {NotFoundError} from './errors/not-found-error'


const app = express()
app.use(json());

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

const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
            });
        console.log("Connected to the DB. ")
        } catch (err) {
            console.error(err)
        }
    
    app.listen(3000,()=>{
        console.log("Started AUTH service on port 3000. I'm Running in GCLOUD! ")
    });
}
 
start()

