import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {enterUser} from "../Actions"
export default function DashboardCreate() {
    const userInfo = useSelector(state => state.userInfo)
    const dispatch = useDispatch();
    const createBoard = async() => {
        try {
            const results = await axios.post(`/api/projects/create/${userInfo._id}`, {name: "New Project"})
            dispatch(enterUser(results.data))

        } catch(e) {
            console.log(e)
        }
    }
    return (
        <div onClick = {() => createBoard()} className = "dashboard__card  dashboard__card--create">
            <h1 className = "dashboard__card-title">Create New Board</h1>
        </div>
    )
}
