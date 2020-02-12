import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextArea from 'react-textarea-autosize'
import {saveItems} from "./Helpers/boardHelpers"
const AddItem = (props) => {
    const [isOpened, setIsOpened] = useState(false)
    const [text, setText] = useState('')
    const {column, projectId, reset,list} = props
    const placeHolder = list ? "Add a new list" : "Add a new task"
    const listStyles = list ? {
        marginLeft: '40px',
        marginTop: "18px",
        width: '260px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingBottom: "20px",
        borderRadius: '8px',
        height: '20px'
    } : {}
    const textStyles = list ? {height: "100px",   backgroundColor: 'rgba(0,0,0,0.1)', marginTop: "18px",width: '260px', borderRadius: "8px"} : {}
    const add = async(column, text, projectId,list) => {
        if (text !== '')
        {
            setIsOpened(!isOpened)
            await saveItems(column, text,projectId, list)
            await reset()
        } else {
            setIsOpened(!isOpened)
        }
    }

    return !isOpened ?  (
        <div  style = {listStyles} className = "task__add-container">
            <div onClick = {() => setIsOpened(true)} className = "task__add-cont">
                <AddIcon className = "task__add"/>
                <p>{placeHolder}</p>
            </div>

        </div>
    ): 
     (
    <div style = {textStyles}className = "task__add-container task__add-text-container">
         <TextArea minRows={3} maxRows={6}  className = "task__add-textarea" onChange = {event => setText(event.target.value)}/>
         <button className = "task__add-button" onClick = {() => add(column,text,projectId,list )}>Save</button>
    </div>
   
    );
}

export default AddItem;
