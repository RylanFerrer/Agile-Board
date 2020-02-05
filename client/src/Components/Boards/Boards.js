import React, {useState} from 'react';
import initialData from '../Data/initial-data'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {onDragEnd} from "./Helpers/boardHelpers"
import Column from './Column';
const Boards = () => {
    const [data, setData] = useState({...initialData});
    return (
            <DragDropContext onDragEnd = {result => onDragEnd(result,data,setData)}>
                <Droppable droppableId = "all-columns" direction = "horizontal" type = "column">
                    {(provided) => (
                    <div className = "column__container"  ref = {provided.innerRef}{...provided.droppableProps}>
                        {data.columnOrder.map((columnId,index) => {
                        const column = data.columns[columnId]
                        const tasks = column.taskIds.map((taskId) => { return data.tasks[taskId]})
                        return <Column key = {column.id}  index = {index} column = {column} tasks = {tasks}/>
                        })}
                    {provided.placeholder}
                    </div>
                    )}   
                </Droppable>
            </DragDropContext>
    );
}

export default Boards;
