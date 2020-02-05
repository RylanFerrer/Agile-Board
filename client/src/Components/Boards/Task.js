import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
const Task = (props) => {
    const {task, index} = props
    return (
        <Draggable draggableId = {task.id} index = {index} key = {task.id}>
            {(provided) => (
                <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                    {task.content}
                </div>
            ) }
        </Draggable>
       
    );
}

export default Task;
