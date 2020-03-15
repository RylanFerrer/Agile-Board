import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import DashboardCard from './DashboardCard'
import DashboardCreate from './DashboardCreate'
export default function Dashboard() {
    const [projects, setProjects] = useState(undefined);
    const userInfo =  useSelector(state => state.userInfo);
    useEffect(() => {
        const fetchData  = async() => {
           if(userInfo) {
            const response = await axios.post(`/api/dashboard/getProjects`, {data: userInfo.Projects})
            setProjects(response.data)
           }
        }
        try {
            fetchData()
        } catch (e) {
            console.log(e)
        }
 
    },[userInfo])
    return projects !== undefined ?  (
        <div className = "dashboard">
            <h3>My Boards</h3>
            <div className = "dashboard__card-container">
                {projects.map((project,key) => {
                    return <DashboardCard project = {project} key = {key}/>
                })}
               <DashboardCreate/>
            </div>
           
        </div>
    ) :  (<h1>Loading</h1>)
}
