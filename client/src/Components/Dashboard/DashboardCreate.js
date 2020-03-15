import React from 'react'
export default function DashboardCreate(props) {
    const {setModal} = props
    
    return (
        <div onClick = {() => setModal()} className = "dashboard__card  dashboard__card--create">
            <h1 className = "dashboard__card-title">Create New Board</h1>
        </div>
    )
}
