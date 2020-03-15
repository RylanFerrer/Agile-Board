import React, {useState} from 'react'
import {Redirect} from 'react-router-dom';
import {useDispatch} from 'react-redux'
import {enterProject} from "../Actions"
export default function DashboardCard(props) {
    const {project} = props
    const [direct, setRedirect] = useState(false)
    const projectRouteString = project.projectName.replace(/\s+/g, '-').toLowerCase();
    const dispatch = useDispatch()
    const openBoard = async() => {
        console.log(project)
        dispatch(enterProject(project._id));
        setRedirect(true)
    }
    if(direct === true ) {
        return <Redirect to = {`/project/${project._id}/${projectRouteString}`}/>
    }
    return (
        <div onClick = {() => openBoard()} className = "dashboard__card">
            <h1 className = "dashboard__card-title">{project.projectName}</h1>
        </div>
    )
}
