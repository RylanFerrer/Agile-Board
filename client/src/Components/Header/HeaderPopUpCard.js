import React from 'react'
import {Link} from 'react-router-dom'
export default function HeaderPopUpCard(props) {
    const {projectName, _id} = props
    const projectRouteString = projectName.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className = "header__popup-card">
            <Link className = "header__popup-card-title" to = {`/project/${_id}/${projectRouteString}`}>{projectName}</Link>
        </div>
    )
}
