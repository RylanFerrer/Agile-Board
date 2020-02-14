import React, {useState} from 'react'
import TextArea from 'react-textarea-autosize'
import {editItem} from '../Boards/Helpers/boardHelpers'
export default function TextModal(props) {
    const {val, textModal, projectId,setTextModalDisplay, reset} = props
    console.log(projectId)
    const [text, setText] = useState(val.content)
    const modalDisplay = textModal ? 'flex' : 'none'
    return (
        <div  style = {{display: modalDisplay}}className = "modal">
                <div>
                    <TextArea minRows={3} maxRows={6} onChange = {(event) => {setText(event.target.value)}} readOnly = {false} className = "task__add-textarea" placeholder = {val.content}/>
                    <button onClick = {() => editItem(val.id, projectId, text, setTextModalDisplay,reset)}className = "task__add-button">Save</button>
                </div>
      
        </div>
    )
}
