import React, {useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
import TextArea from 'react-textarea-autosize'
import {saveItems} from "./Helpers/boardHelpers"
import {listStyles, textStyles} from "./Helpers/boardStyles"
import {useSelector} from 'react-redux'
const AddItem = (props) => {
    const projectId = useSelector(state => state.currentProject)
    const [isOpened, setIsOpened] = useState(false)
    const [text, setText] = useState('')
    const {column,reset,list} = props
    const placeHolder = list ? "Add a new list" : "Add a new task"

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
        <div  style = { list ? listStyles : {}} className = "task__add-container">
            <div onClick = {() => setIsOpened(true)} className = "task__add-cont">
                <AddIcon className = "task__add"/>
                <p>{placeHolder}</p>
            </div>
        </div>
    ): 
     (
    <div style = {list ?  textStyles : {}}className = "task__add-container task__add-text-container">
         <TextArea minRows={3} maxRows={6}  className = "task__add-textarea" onChange = {event => setText(event.target.value)}/>
         <button className = "task__add-button" onClick = {() => add(column,text,projectId,list )}>Save</button>
    </div>
   
    );
}

export default AddItem;
