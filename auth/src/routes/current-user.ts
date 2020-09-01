import express from "express";
import {currentUser} from '../middlewares/curent-user';
import {requireAuth} from '../middlewares/require-auth';
// The purpose of currentUserRouter is to provide user information to the React part of the application
// If there is a cookie in other words if user is loggedin then send information about the user to the react app

const router = express.Router()

router.get('/api/users/currentuser',currentUser,requireAuth, (req,res) => {
    // Since we took all the validation logic out to "current-user" middleware
    // And since that middleware already perform all neccessary opeartions 
    // all we need to do is to send back a currentUser object which now is part of the request(req) 
    res.send({ currentUser: req.currentUser || null })
});

export { router as currentUserRouter }; 