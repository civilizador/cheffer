import express from 'express'
import {json} from 'body-parser'
import {currentUserRouter} from './routes/current-user'
import {signoutRouter} from './routes/signout'
import {signupRouter} from './routes/signup'
import {signinRouter} from './routes/signin'


const app = express()
app.use(json());

// Get User route
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.listen(3000,()=>{
    console.log("Started AUTH service on port 3000. I'm Running in GCLOUD! ")
});