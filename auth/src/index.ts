import express from 'express'
import {json} from 'body-parser'
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
app.all('*',() => {
    throw new NotFoundError();
})

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Started AUTH service on port 3000. I'm Running in GCLOUD! ")
});