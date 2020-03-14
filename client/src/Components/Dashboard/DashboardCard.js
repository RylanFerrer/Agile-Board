import React from 'react'

export default function DashboardCard(props) {
    const {project} = props
    return (
        <div className = "dashboard__card">
            <h1 className = "dashboard__card-title">{project.projectName}</h1>
        </div>
    )
}
