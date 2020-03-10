import React, {useRef} from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import {editItem,removeItem} from '../Boards/Helpers/boardHelpers'
import ArchiveIcon from '@material-ui/icons/Archive';
export default function TextModal(props) {
    const {val, textModal, projectId,setTextModalDisplay, reset} = props
    const toggle = () =>setTextModalDisplay(!textModal)
    const disabledValue = textModal ? false : true
    const modalDisplay = textModal ? 'flex' : 'none'
    const newRef = useRef()
    return  val ? (
        <div  style = {{display: modalDisplay}}className = "modal">
            <OutsideClickHandler  disabled = {disabledValue} onOutsideClick={() => toggle()}>
            <div className = "modal__content">
              
                <div className = "modal__container">
                        <textarea ref={newRef}  readOnly = {false} className = "modal__textarea" placeholder = {val.taskItem.content}/>
                        <button onClick = {() => editItem(val.taskItem.id, projectId, setTextModalDisplay,reset,newRef)}className = "task__add-button">Save</button>
                    </div>
                
                    <div className = "modal__container-side">
                        <span onClick = {() => removeItem(val.taskItem.id, projectId, val.column,reset,setTextModalDisplay)  } className  ="modal__container-side-archive"> <ArchiveIcon className = "archive"/> Archive</span>
                    </div>
                </div>
                </OutsideClickHandler>
        </div>
    ) : (<h1 style = {{display: modalDisplay}}>No item selected</h1>)
}
