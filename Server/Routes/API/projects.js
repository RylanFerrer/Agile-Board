const express = require('express')
const Project = require('../../Models/ProjectSchema')
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
router.put("/editItem/:projectId", async(req,res) => {
    const {projectId} = req.params;
    const {itemId, content} = req.body
    const query = {_id: projectId}
    try {
        const currentProject = await Project.findOne(query)
        const changedItem  = currentProject.tasks[itemId]
        changedItem.content = content
        currentProject.tasks[itemId] = changedItem
        await Project.updateOne(query, currentProject)
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(400)
    }
})
router.delete('/removeItem/:projectId', async(req,res) => {
    const {projectId} = req.params
    const {id, column} = req.body
    const query = {_id: projectId}

    try {
        currentProject = await Project.findOne(query)
        const newTasks = currentProject.tasks.filter(task => task.id !== id )
        const updatedColumn = currentProject.columns[column.id].taskIds.filter(task => task !== id)
        currentProject.tasks = newTasks
        currentProject.columns[column.id].taskIds = updatedColumn
        await Project.updateOne(query, currentProject)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})
router.delete('/removeList/:projectId', (req,res) => {
    const {projectId} = req.params
    const {id, column} = req.body
    const query = {_id: projectId}

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
    },
    columns: {
    },
    columnOrder: []
  })
  await newProject.save()
  console.log("Success")
} catch(e) {
    console.log(e)
}
})


module.exports = router