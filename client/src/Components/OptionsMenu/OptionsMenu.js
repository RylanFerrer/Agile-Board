import React from 'react'
import { removeList} from "../Boards/Helpers/boardHelpers"
import {useSelector} from 'react-redux'
export default function OptionsMenu(props) {
    const projectId = useSelector(state => state.currentProject)
    const {isOpened,column, toggle, reset} = props
    const displayValue = isOpened ? 'block' : 'none'
    return (
        <div style = {{display: displayValue}} className = "options__menu">
            <h5 className = "options__menu-header">List Actions</h5>
            <h5 onClick = {() =>removeList(column,projectId, toggle, reset)} className = "options__menu-item">Archive List</h5>
        </div>
    )
}
