import mongoose from 'mongoose'
// Importing Password class that will encrypt/decrypt user provided passwords
import {Password} from '../services/password'

// Interface that describes properties that a User Model has.
// We indicate that a "build" method will return an object described in UserDoc interface.
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// Interface that describes the properties required to create a new User
interface UserAttrs {
    email: string;
    password: string;
    name:   string;
}

// Interface that describes the properties that each single instance of User has.
// In other words each User document
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
    name:   string;
    // updatedAt: string;
    // createdAt: string;
}

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        }
    },
    {
        toJSON: {
           transform(doc,ret){
            // writing value of _id property from DB to output object   
               ret.id = ret._id;
            // then deleting original _id property replacing it with just (.id) property
            // to fit output for othe DB syntax standards:
                delete ret._id
            //    will remove property from any DB response.
                delete ret.password;
            // deleting unneccessarry for us DB record properties
                delete ret.__v
           } 
        }
    } 
);

//  Now we will add middleware form "Mongoose" library 
//  It will be called Everytime new User created
//  Since we are accessing "this" we cannot use arrow function since we will lose context
userSchema.pre('save', async function(done){
    if ( this.isModified('password') ){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    // We need to call done at the end of async function to avoid unhandled promise rejection crash
    done()

})

// In order to add type annotations to user creation process.
// In other words to be able to check that params passed to User model are correct
// Will will add a new method to mongoose UserSchema.
// We will use a typeScript Interfaces that we defined earlier
userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

// We are providing customized types to our user object using <>
// This is the way in type script to pass types as an arguments to a function
// First Argument Extending known types of the class
// Second argument indicates what will be returned from this function 
// In our case it is UserModel 
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export {User}