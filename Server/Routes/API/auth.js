const express = require('express')
const router = express.Router()
const withAuth = require("../../helper/middleware")
const User = require('../../Models/UserSchema')

router.get('/checkToken', withAuth , (req,res) => {
    return  res.json({id: req.id}).status(200);
 });
 router.get('/logout', (req,res) => {
     res.clearCookie('token');
     return res.status(200).redirect('/');
 })
 router.post('/login', async(req,res) => {

    const {email,password} = req.body;
    try {
       const findUser = await User.findOne({email})
       await findUser.isCorrectPassword(password)
       const payload = {
        email: email,
        id: user._id};
        const token = jwt.sign(payload, secret, {
        expiresIn: '1h' 
    });
    res.cookie('token', token, { httpOnly: true })
    .sendStatus(200);
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
 })

 module.exports = router