import React,{useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import DashboardCard from './DashboardCard'
import DashboardCreate from './DashboardCreate'
import CreateBoardModal from '../Modal/CreateBoardModal'
import Header from "../Header/Header"
import axios from 'axios'
export default function Dashboard() {
    const [projects, setProjects] = useState(undefined);
    const [modal ,setModal] = useState(false)
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
        <>
        <Header/>
        <div className = "dashboard">
            <h3>My Boards</h3>
            <div className = "dashboard__card-container">
                {projects.map((project,key) => {
                    return <DashboardCard project = {project} key = {key}/>
                })}
               <DashboardCreate setModal = {() => setModal(!modal)}/>
            </div>
           
        </div>
        <CreateBoardModal  setModal = {() => setModal(!modal)} modal = {modal}/>
        </>
    ) :  (<h1>Loading</h1>)
}
