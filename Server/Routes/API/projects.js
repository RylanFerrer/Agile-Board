const express = require('express')
const Project = require('../../Models/ProjectSchema')
const mongoose = require('mongoose')
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        const proj = await Project.findOne({_id: "5e3b66006b853e13f8515055"})
        res.send(proj)
    } catch (e) {
        res.sendStatus(400)
    }
 
})
router.get("/test", async(req,res) => {
    try {
  const newProject =  new Project({
    tasks: {
        'task-1': {id:"task-1", content: 'Take out the garbage'},
        'task-2': {id:"task-2", content: 'Watch TV'},
        'task-3': {id:"task-3", content: 'Take dog on a walk'},
        'task-4': {id:"task-4", content: 'Clean Bathroom'},
        'task-5': {id:"task-5", content: 'Something'},
        'task-6': {id:"task-6", content: 'Something'},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: "to-do",
            taskIds: ["task-1", "task-2", "task-3", "task-4","task-5","task-6"]
        },  
        'column-2': {
            id: 'column-2',
            title: "In Progress",
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Completed',
            taskIds:[]
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
  })
  await newProject.save()
  console.log("Success")
} catch(e) {
    console.log(e)
}
})


module.exports = router