import React, {useState} from 'react';
import initialData from '../Data/initial-data'
import {DragDropContext} from 'react-beautiful-dnd'
import Column from './Column';
const Boards = () => {
    const [data, setData] = useState({...initialData});
    const onDragEnd = result => {

    }
    const test = data.columnOrder.map((columnId) => {
        const column = data.columns[columnId]
        const tasks = column.taskIds.map((taskId) => { return data.tasks[taskId]})

        return <Column key = {column.id} column = {column} tasks = {tasks}/>
    })
    return (
        <DragDropContext  onDragEnd = {onDragEnd}>
            {test}
        </DragDropContext>
    );
}

export default Boards;
