import express from "express";

const router = express.Router()

router.post('/api/users/signout', (req,res) => {
    req.session = null;
    console.log("Signed out")
    res.send('SIGNOUT')
});

export { router as signoutRouter }; 