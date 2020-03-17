import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';
import axios from 'axios'
import HeaderPopUp from './HeaderPopUp'
import home from '../../Assets/Images/home.svg' 
import dashboard from "../../Assets/Images/dashboard.svg"
import exit from "../../Assets/Images/exit.svg"
export default function Header() {
    const [popup, setPopup] = useState(false)
    const [redirect,setRedirect] = useState(false)
    const clickHandlerDisabledValue = popup ? false : true
    const logout = async() => {
        const log = await axios.get('/api/auth/logout');
       if(log.status === 200) {
        setRedirect(true)
       }
    }
    
    return !redirect ? (
        <header className = "header">
            <nav className = "header__nav">
                <ul className = "header__nav-menu">
                    <li>
                        <Link className = "header__nav-menu-link" to = "/">
                            <img className = "header__nav-menu-link-icon" src = {home} alt = "Button to go back to home page"/>
                        </Link>
                    </li>
                    <li>
                        <div className = "header__nav-menu-container">
                            <OutsideClickHandler disabled = {clickHandlerDisabledValue} onOutsideClick={() => setPopup(!popup)}>
                                <img onClick = {() => {setPopup(!popup)}} className = "header__nav-menu-link-icon" src = {dashboard} alt = "Button to view all boards"/>
                                <HeaderPopUp isOpen = {popup} setIsOpen = {() => setPopup(!popup)}/>
                            </OutsideClickHandler>
                        </div>
                    </li>
                    <li>
                        <img onClick = {() => {logout()}} className = "header__nav-menu-link-icon" src = {exit} alt = "Logout of account"/>
                    </li>
                </ul>
            </nav>

        </header>
    ) : ( <Redirect to = "/login"/>)
}
