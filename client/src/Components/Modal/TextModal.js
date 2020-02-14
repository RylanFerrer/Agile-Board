import React, {useRef} from 'react'
import {editItem} from '../Boards/Helpers/boardHelpers'
import ArchiveIcon from '@material-ui/icons/Archive';
export default function TextModal(props) {
    const {val, textModal, projectId,setTextModalDisplay, reset} = props
    const modalDisplay = textModal ? 'flex' : 'none'
    const newRef = useRef()
    return (
        <div  style = {{display: modalDisplay}}className = "modal">
            <div className = "modal__content">
                <div className = "modal__container">
                        <textarea ref={newRef}  readOnly = {false} className = "modal__textarea" placeholder = {val.content}/>
                        <button onClick = {() => editItem(val.id, projectId, setTextModalDisplay,reset,newRef)}className = "task__add-button">Save</button>
                    </div>
                    <div className = "modal__container-side">
                        <span className  ="modal__container-side-archive"> <ArchiveIcon className = "archive"/> Archive</span>
                    </div>
                </div>
        </div>
    )
}
