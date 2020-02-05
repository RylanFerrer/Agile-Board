import React from 'react';
import Task from './Task'
import {Droppable,Draggable} from 'react-beautiful-dnd'
const Column = (props) => {
    const {column, tasks,index} = props
    return (
        <Draggable draggableId = {column.id} index = {index}>
        {(provided) => (
        <div className = "column"  ref = {provided.innerRef}  {...provided.draggableProps}>
            <h3  className = "column__text"{...provided.dragHandleProps}>{column.title.toUpperCase()}</h3>
          
            <Droppable droppableId ={column.id} type = "task">
                {(provided) => (
                <div className = "task__container" ref = {provided.innerRef}  {...provided.droppableProps}>

                    {tasks.map((task,index) => {return <Task task = {task} index = {index} key = {index} />})}
                    {provided.placeholder}
                </div>)
                }
            </Droppable>
        </div>
         )}
        </Draggable>
    );
}

export default Column;
