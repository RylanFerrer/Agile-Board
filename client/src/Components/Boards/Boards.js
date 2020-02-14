import React, {useState,useEffect} from 'react';
import axios from 'axios'
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {onDragEnd, resetBoard} from "./Helpers/boardHelpers"
import  TextModal from "../Modal/TextModal"
import Additem from "./AddItem"
import Column from './Column';
const Boards = () => {
    const [data, setData] = useState(null);
    const [projectId, setProjectId] =useState(null)
    const [val,setVal] = useState(null)
    const [textModalDisplay, setTextModalDisplay] = useState(false)

   
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get("/api/projects")
            setData(response.data)
            setProjectId(response.data._id)
        }
        try {
        fetchData()
        } catch(e) {
            console.log(e)
        }
    }, [])
    const setModal = (content,column) => {
        setVal({taskItem: content, column: column})
        setTextModalDisplay(!textModalDisplay)
    }
        return data  ? (
            <>
                <div className = "flex-container">
                <DragDropContext onDragEnd = {result => onDragEnd(result,data,setData, projectId)}>
                    <Droppable droppableId = "all-columns" direction = "horizontal" type = "column">
                        {(provided, snapshot) => (
                        <div className = "column__container"  isDragging = {snapshot.isDragging}ref = {provided.innerRef}{...provided.droppableProps}>
                            {data.columnOrder.map((columnId,index) => {
                            const column = data.columns[columnId]
                            const tasks = column.taskIds.map((taskId) => { return data.tasks[taskId]})
                            return <Column  setModal = { setModal}reset = {() => resetBoard(setData)}projectId = {projectId} key = {column.id}  index = {index} column = {column} tasks = {tasks}/>
                            })}
                           <Additem list projectId = {projectId} reset = {() => resetBoard(setData)}/>
                        {provided.placeholder}
                        </div>
                
                        )}
                            
                    </Droppable>
                </DragDropContext>
                <TextModal reset = {setData} projectId = {projectId} setTextModalDisplay = {setTextModalDisplay} textModal = {textModalDisplay} val = {val}/>
                </div>
            </>)  : <h1>Loading</h1>;
                            
}

export default Boards;
