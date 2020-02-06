import React, {useState,useEffect} from 'react';
import initialData from '../Data/initial-data'
import axios from 'axios'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {onDragEnd} from "./Helpers/boardHelpers"
import Column from './Column';
const Boards = () => {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get("/api/projects")
            setData(response.data)
        }
        try {
        fetchData()
        } catch(e) {
            console.log(e)
        }
    }, [])
    if(data !== undefined) {
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
}  else {return(<h1>Loading</h1>) }
}

export default Boards;
