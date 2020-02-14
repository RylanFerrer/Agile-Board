import React from 'react';
import editButton from '../../Assets/Images/edit.svg'
import {Draggable} from 'react-beautiful-dnd';
const Task = (props) => {
    const {task, index ,setModal,column} = props
    return (
        <>
        <Draggable draggableId = {task.id} index = {index} key = {task.id}>
            {(provided) => (
                <div className = "task__overlay-container" {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
                    <div className = "task" >
                        {task.content}
                    </div>
                    <div className = "task__overlay">
                        <img  className = "task__overlay-img" alt = "edit" onClick = {() => setModal(task,column) } src = {editButton}/> 
                    </div>
                </div>
               
            ) }
        </Draggable>
        </>
  
    );
}

export default Task;
