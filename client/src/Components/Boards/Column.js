import React from 'react';
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd'
const Column = (props) => {
    const {column, tasks} = props
    return (
        <div>
            {column.title}
            <Droppable droppableId ={column.id}>
                {(provided) => (
                <div ref = {provided.innerRef}  {...provided.droppableProps}>

                    {tasks.map((task,index) => {return <Task task = {task} index = {index} key = {index} />})}
                    {provided.placeholder}
                </div>)
                }
            </Droppable>
        </div>
    );
}

export default Column;
