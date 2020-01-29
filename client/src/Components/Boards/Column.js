import React from 'react';
import Task from './Task'
import {Droppable} from 'react-beautiful-dnd'
const Column = (props) => {
    console.log(props)
    const {column, tasks} = props
    return (
        <div>
            {column.title}
            <Droppable droppableId ={column.id}>
                {(provided) => (
                <div ref = {provided.innerRef} {...provided.droppableProps}>

                    {tasks.map((task,id) => {return <Task task = {task} index = {id} key = {id}/>})}
                    {provided.placeholder}
                </div>)
                }
            </Droppable>
        </div>
    );
}

export default Column;
