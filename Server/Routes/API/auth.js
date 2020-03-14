const express = require('express')
const router = express.Router()
const withAuth = require("../../helper/middleware")
const User = require('../../Models/UserSchema')
const jwt = require('jsonwebtoken');
const secret ="thisismysecretn";

router.get('/checkToken', withAuth , (req,res) => {
    return  res.json({userInfo: req.id}).status(200);
 });
 router.get('/logout', (req,res) => {
     res.clearCookie('token');
     return res.status(200).redirect('/');
 })
 router.post('/login', async(req,res) => {
    const {email,password} = req.body;
    User.findOne({email}, (err,user) => {
        // if there is a server error
        if(err) {
            console.log(err);
            res.status(500).json({
               message: 'Internal error please try again'
            });
            // if the user does not exist
        } else if (!user) {
            console.log('user not found')
            res.status(401).json({
                error: 'Incorrect email or password'
            })
            // if there are no server errors and the user exists
        } else {
            //We are checking if the user has the same email
            user.isCorrectPassword(password,(err,same) => {
                if(err) {
                    res.status(500).json({
                        error: 'Internal error please try again'
                    });
                //if the passwords aren't the same 
                } else if (!same) {
                    console.log('password not found')
                    res.status(401).json({
                        error: 'Incorrect email or password'
                    })
                } else {
                    console.log('success')
                    const payload = {
                        email: email,
                        user: user};
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h' 
                    });
                    res.cookie('token', token, { httpOnly: true }).send(user);
                }
            });
        }
    });
 })
 router.post('/register', async(req,res) => {
     const {email,password,name} = req.body
    console.log(req.body)
     let checkEmail = await User.findOne({email: email})
     if(checkEmail) {
         res.sendStatus(204).json({
             message: "Email already has been used"
         })
     }
     const newUser = new User(
         {
             email: email,
             password: password,
             name: name,
             projects: []
         }
     )
     await newUser.save()
     res.sendStatus(200)
})

 module.exports = router