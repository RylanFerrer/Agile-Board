import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {enterUser, enterAllProjects} from "../Actions"
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'
import close from "../../Assets/Images/close.svg"

export default function CreateBoardModal(props) {
    const {modal, setModal} = props
    const [title, setTitle] = useState('')
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch();
    const view = modal === true ? 'flex' : 'none';
    const checkedDisabled = title.length > 0 ? false : true;
    const disabledValue = modal === true ? false : true;
    const buttonStyles = title.length > 0 ? {
        backgroundColor: "#5aac44",
        color: "white"
    } : {
        backgroundColor: "#f4f5f7",
        color: "black"
    }
    const createBoard = async(text) => {
        try {
            const results = await axios.post(`/api/projects/create/${userInfo._id}`, {name: text})
            const boardResults = await axios.post(`/api/dashboard/getProjects`, {data: results.data.Projects})
            console.log(results.data)
            dispatch(enterAllProjects(boardResults.data))
            dispatch(enterUser(results.data))
            setModal()
        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div  style = {{display: view}}className = "modal">
            <div className = "modal__create">
                <img className = "modal__close" onClick = {() => setModal()}src = {close} alt = {"Close Modal Button"}/>
                <OutsideClickHandler disabled = {disabledValue} onOutsideClick={() => setModal()}>
                <div className = "modal__create-box">
                <input  onChange = {(event) => setTitle(event.target.value) }className = "modal__create-input" placeholder = "Add Board Title"/>
                </div>
                <button style = {buttonStyles} disabled = {checkedDisabled}  className = "modal__create-button" onClick = {() => createBoard(title)}>Create Board</button>
                </OutsideClickHandler>
            </div>
        </div>
    )
}
