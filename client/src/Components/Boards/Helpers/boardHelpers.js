import axios from 'axios'
import uuid from 'uuid'
export const onDragEnd = async(result,data,setData, projectId) => {
    const {destination,source,draggableId,type} = result
    if(!destination)
    {
        return
    }
    if (type === "column") {
        const newColumnOrder = Array.from(data.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index,0, draggableId)

        const newData = {
            ...data, 
            columnOrder: newColumnOrder
        }

        updateBoard(newData, projectId)
        setData(newData)
        return;
    }
    const start = data.columns[source.droppableId]
    const finish = data.columns[destination.droppableId]
    if(start ===finish) 
    {
        const newTaskIds =Array.from(start.taskIds)
        newTaskIds.splice(source.index,1)
        newTaskIds.splice(destination.index,0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds
        }
        const newData = {
            ...data, 
            columns: {
            ...data.columns,
            [newColumn.id]:newColumn
            }
        } 
        updateBoard(newData, projectId)
        setData(newData)
        return;
    }
    ///Moving from one list to another
    const startTasksIds = Array.from(start.taskIds)
    startTasksIds.splice(source.index,1)
    const newStart = {
        ...start,
        taskIds:startTasksIds
    }
    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index,0, draggableId);
    const newFinish = {
        ...finish,
        taskIds:finishTaskIds
    }
    const newData = {
        ...data, 
        columns: {
            ...data.columns,
            [newStart.id]:newStart,
            [newFinish.id]: newFinish, 
        }
    }
    updateBoard(newData, projectId)
    setData(newData)
    return;
}
export const saveItems = async(column, item, projectId) => {
    const id = uuid.v4();
    const newItem = 
        {
            id: id,
            item: item
        }
    
    await axios.put(`/api/projects/addItem/${projectId}`, {item: newItem, column: column})

}
const updateBoard = async(newData, projectId) => {
    await axios.put(`/api/projects/${projectId}`, {data: newData})
    return
} 
export const resetBoard = async(setData) => {
    const response = await axios.get('/api/projects')
    setData(response.data)
    return
} 