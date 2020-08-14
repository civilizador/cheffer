import express from 'express'
import {json} from 'body-parser'
import {currentUserRouter} from './routes/current-user'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {signinRouter} from './routes/signin'
import {errorHandler} from './middlewares/error-handler'

const app = express()
app.use(json());

// Get User route
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log("Started AUTH service on port 3000. I'm Running in GCLOUD! ")
});