import React,{ useState} from 'react'
import {useSelector} from 'react-redux'
import DashboardCard from './DashboardCard'
import DashboardCreate from './DashboardCreate'
import CreateBoardModal from '../Modal/CreateBoardModal'
import Header from "../Header/Header"

export default function Dashboard() {
    const [modal ,setModal] = useState(false)
    const allProjects =  useSelector(state => state.allProjects);

    return allProjects ?  (
        <>
        <Header/>
        <div className = "dashboard">
            <h3>My Boards</h3>
            <div className = "dashboard__card-container">
                {allProjects.map((project,key) => {
                    return <DashboardCard project = {project} key = {key}/>
                })}
               <DashboardCreate setModal = {() => setModal(!modal)}/>
            </div>
           
        </div>
        <CreateBoardModal  setModal = {() => setModal(!modal)} modal = {modal}/>
        </>
    ) :  (<h1>Loading</h1>)
}
