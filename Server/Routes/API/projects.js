const express = require('express')
const Project = require('../../Models/ProjectSchema')
const mongoose = require('mongoose')
const router = express.Router();

router.get('/', async(req,res) => {
    try {
        const proj = await Project.findOne({})
        res.send(proj)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
 
})
router.put('/:projectId',async(req,res) => {
    const {projectId} = req.params;
    const {data} = req.body;
    const query = {_id: projectId}
    try {
        await Project.updateOne(query, data)
        res.sendStatus(200)
    } catch(e) {
        console.log(e)
        res.sendStatus(400)
    }
})
router.put('/addItem/:projectId', async(req,res) => {
    const {projectId} = req.params
    const {item,column} = req.body
    const query = {_id: projectId}
    try {
        const currentProject = await Project.findOne(query)
        const currentColumn = currentProject.columns[column.id]
        const newTask = {...currentProject.tasks, [item.id]: {id: item.id, content: item.item}}
        currentProject.tasks = newTask
        currentColumn.taskIds.push(item.id)
        currentProject.columns[column.id] = currentColumn
        await Project.updateOne(query, currentProject)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})
router.put('/addList/:projectId', async(req,res) => {
    const {projectId} = req.params;
    const {title, id} =req.body
    const query = {_id: projectId}
    try {
    const currentProject = await Project.findOne(query)
    const newColumnData = {
        ...currentProject.columns, [id]: {id: id, title: title, taskIds: []}
    }
    currentProject.columnOrder.push(id)
    currentProject.columns = newColumnData
    await Project.updateOne(query, currentProject) 
    console.log('success')
    res.sendStatus(200)
    } catch(e) {
        console.log(e)
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