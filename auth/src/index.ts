import express from 'express'
import {json} from 'body-parser'
const app = express()
app.use(json());

// Get User route
app.get('/api/users/currentuser', (req,res) => {
    res.send('User Data Recieved Successfully')
});

app.listen(3000,()=>{
    console.log("Started AUTH service on port 3000. I'm Running in GCLOUD! ")
});