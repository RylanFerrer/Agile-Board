import React, {useState,useEffect} from 'react';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'
import {onDragEnd, resetBoard} from "./Helpers/boardHelpers"
import {useSelector, useDispatch} from 'react-redux'
import {enterProject} from "../Actions"
import axios from 'axios'
import  TextModal from "../Modal/TextModal"
import Additem from "./AddItem"
import Column from './Column';
import Header from '../Header/Header'

const Boards = (props) => {
    const {id} = props.match.params
    const dispatch = useDispatch()
    const [data, setData] = useState(null);
    const [val,setVal] = useState(null)
    const [textModalDisplay, setTextModalDisplay] = useState(false)
    const projectId = useSelector(state => state.currentProject)
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(`/api/projects/${id}`)
            dispatch(enterProject(id))
            setData(response.data)
        }
        try {
        fetchData()
        } catch(e) {
            console.log(e)
        }
    }, [id, dispatch])
    const setModal = (content,column) => {
        setVal({taskItem: content, column: column})
        setTextModalDisplay(!textModalDisplay)
    }
        return data  ? (
            <>
                <Header/>
                <div className = "flex-container">
                <DragDropContext onDragEnd = {result => onDragEnd(result,data,setData, projectId)}>
                    <Droppable droppableId = "all-columns" direction = "horizontal" type = "column">
                        {(provided, snapshot) => (
                        <div className = "column__container"  isdragging = {snapshot.isDragging}ref = {provided.innerRef}{...provided.droppableProps}>
                            {data.columnOrder.map((columnId,index) => {
                            const column = data.columns[columnId]
                            const tasks = column.taskIds.map((taskId) => { return data.tasks[taskId]})
                            return <Column  setModal = { setModal}reset = {() => resetBoard(setData,projectId)}  key = {column.id}  index = {index} column = {column} tasks = {tasks}/>
                            })}
                           <Additem list  reset = {() => resetBoard(setData,projectId)}/>
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
