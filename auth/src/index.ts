import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('Error JWT key undefined.')
    }
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

