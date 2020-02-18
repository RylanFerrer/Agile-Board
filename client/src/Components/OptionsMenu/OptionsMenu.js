import React from 'react'
export default function OptionsMenu(props) {
    const {isOpened} = props
    const displayValue = isOpened ? 'block' : 'none'
    return (
        <div style = {{display: displayValue}} className = "options__menu">
            <h5 className = "options__menu-header">List Actions</h5>
            <h5 onClick = {() => console.log('archive')} className = "options__menu-item">Archive List</h5>
        </div>
    )
}
