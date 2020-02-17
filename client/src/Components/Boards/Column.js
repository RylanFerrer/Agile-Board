import React from 'react';
import Task from './Task'
import AddItem from './AddItem'
import Options from "../OptionsMenu/Options"
import {Droppable,Draggable} from 'react-beautiful-dnd'
const Column = (props) => {
    const {column, tasks,index, projectId, reset, setModal} = props
    return (
        <Draggable draggableId = {column.id} index = {index}>
        {(provided) => (
        <div className = "column"  ref = {provided.innerRef}  {...provided.draggableProps}>
            <h3  className = "column__text"{...provided.dragHandleProps}>{column.title.toUpperCase()}</h3>
            <Options projectId = {projectId} column = {column}/>
            <Droppable className = "test" droppableId ={column.id} type = "task">
                {(provided) => (
                <div  className = "task__container" ref = {provided.innerRef}  {...provided.droppableProps}>

                    {tasks.map((task,index) => {return <Task column = {column} setModal = {setModal} task = {task} index = {index} key = {index} />})}
                    {provided.placeholder}
                    <AddItem  reset=  {reset} projectId = {projectId} column = {column} className = "task"/>     
                </div>)
                }
            </Droppable>
  
        </div>
         )}
        </Draggable>
    );
}

export default Column;
