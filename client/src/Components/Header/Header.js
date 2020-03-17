import React from 'react'
import {Link} from 'react-router-dom'
import home from '../../Assets/Images/home.svg'
export default function Header() {
    return (
        <header className = "header">
            <nav className = "header__nav">
                <ul className = "header__nav-menu">
                    <li>
                        <Link className = "header__nav-menu-link" to = "/">
                            <img className = "header__nav-menu-link-icon" src = {home} alt = "Button to go back to home page"/>
                        </Link>
                    </li>
                </ul>
            </nav>

        </header>
    )
}
