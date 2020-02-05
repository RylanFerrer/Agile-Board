import React, {useState} from 'react';
import initialData from '../Data/initial-data'
import {DragDropContext} from 'react-beautiful-dnd'
import Column from './Column';
const Boards = () => {
    const [data, setData] = useState({...initialData});
    const onDragEnd = result => {
        const {destination,source,draggableId} = result
        if(!destination)
        {
            return
        }
        if(destination.draggableId === source.draggableId && destination.index === source.index) {
            return
        } 
        const column = data.columns[source.droppableId]
        const newTaskIds =Array.from(column.taskIds)
        newTaskIds.splice(source.index,1)
        newTaskIds.splice(destination.index,0, draggableId);

        const newColumn = {
            ...column,
            taskIds: newTaskIds
        }
        const newData = {
            ...data, 
            columns: {
            ...data.columns,
            [newColumn.id]:newColumn
            }
        }   
        setData(newData)
    }
    return (
        <DragDropContext  onDragEnd = {onDragEnd}>
            {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId]
            const tasks = column.taskIds.map((taskId) => { return data.tasks[taskId]})
            return <Column key = {column.id} column = {column} tasks = {tasks}/>
        })}
        </DragDropContext>
    );
}

export default Boards;
