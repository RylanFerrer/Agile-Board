const express = require('express')
const User = require('../../Models/UserSchema')
const Projects = require ('../../Models/ProjectSchema')
const router = express.Router();

router.get('/:userId', (req,res) => {
    const {userId} = req.params;
    const query = {_id: userId}
    try {
        const userData = User.findOne(query);
    } catch (e) {
        console.log(e)
    }
})

router.post('/getProjects', async(req,res) => {
    const allUserProjects = req.body.data
    try {
        const allProjectInfo = await Projects.find({'_id': {$in: allUserProjects}})
        res.send(allProjectInfo).status(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})

module.exports = router 