import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextArea from 'react-textarea-autosize'
import {saveItems} from "./Helpers/boardHelpers"
const AddItem = (props) => {
    const [isOpened, setIsOpened] = useState(false)
    const [text, setText] = useState('')
    const {type, column, projectId, reset} = props
    const placeHolder = type === 'list' ? "Add a new list" : "Add a new task"
    const add = async(column, text, projectId) => {
        setIsOpened(!isOpened)
        await saveItems(column, text,projectId)
        await reset()
    }
    return  !isOpened ? (
        <div className = "task__add-container">
            <div onClick = {() => setIsOpened(true)} className = "task__add-cont">
                <AddIcon className = "task__add"/>
                <p>{placeHolder}</p>
            </div>

        </div>
    ): (
    <div className = "task__add-container">
         <TextArea onChange = {event => setText(event.target.value)}/>
         <button onClick = {() => add(column,text,projectId )}>Save</button>
    </div>
   
    );
}

export default AddItem;
