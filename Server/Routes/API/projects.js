const express = require('express')
const Project = require('../../Models/ProjectSchema')
const User = require('../../Models/UserSchema')
const uuid = require('uuid')
const router = express.Router();

router.get('/:projectId', async(req,res) => {
    const {projectId} = req.params
    try {
        const proj = await Project.findOne({_id: projectId })
        res.send(proj)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
 
})
router.post('/create/:user',async(req,res) =>{
    try {
        const {name} = req.body;
        const {user} = req.params
        const query = {_id: user}
        const newProject = new Project ({
            users: [],
            projectName : name,
            columnOrder:[
                "column-1", 
                "column-2", 
                "column-3"
            ],
            tasks: {},
            columns: {
                "column-1" : {
                    "id" : "column-1",
                    "title" : "to-do",
                    "taskIds" : []
                },
                "column-2" : {
                    "id" : "column-2",
                    "title" : "In Progress",
                    "taskIds" : []
                },
                "column-3" : {
                    "id" : "column-3",
                    "title" : "Completed",
                    "taskIds" : []
                },
            },
        })
        const result = await User.findOne(query);
        result.Projects.push(newProject._id);
        await result.save()
        await newProject.save()
        res.send(result).status(200)

    } catch (e) {
        res.sendStatus(400)
        console.log(e)
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
router.put('/removeItem/:projectId', async(req,res) => {
    const {projectId} = req.params
    const {itemId, column} = req.body
    const query = {_id: projectId}
    try {
        currentProject = await Project.findOne(query)
        delete currentProject.tasks[itemId]
        const updatedColumn = currentProject.columns[column.id].taskIds.filter(task => task !== itemId)
         currentProject.columns[column.id].taskIds = updatedColumn
         await Project.updateOne(query, currentProject)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})
router.put('/removeList/:projectId', async(req,res) => {
    const {projectId} = req.params
    const { column} = req.body
    const query = {_id: projectId}
    try {
        currentProject = await Project.findOne(query);
        const tasks = currentProject.columns[column.id].taskIds;
        tasks.forEach(task => {
            if(currentProject.tasks[task])
            {
                delete currentProject.tasks[task]
            }
        })
        const newColumnOrder = currentProject.columnOrder.filter(col => col !== column.id)
        delete currentProject.columns[column.id]
        currentProject.columnOrder= newColumnOrder
      await Project.updateOne(query, currentProject)
        res.sendStatus(200)
    } catch(e) {
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