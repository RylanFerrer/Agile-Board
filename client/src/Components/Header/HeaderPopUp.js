import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import HeaderPopUpCard from './HeaderPopUpCard'

export default function HeaderPopUp(props) {
    const {isOpen } = props
    const [inputText, setInputText] = useState('')
    const displayPopup = isOpen === true ? 'block': 'none'
    const allProjects =  useSelector(state => state.allProjects);
    return (
        <div  style = {{display: displayPopup}}className = "header__popup">
            <div>
                <input className = "header__popup-input" onChange = {event => setInputText(event.target.value.toLowerCase())} placeholder = "Search For Board"></input>
            </div>
            <div> 
                {allProjects && allProjects.map((project,index) => {
                    if(project.projectName.toLowerCase().includes(inputText))
                    return <HeaderPopUpCard key = {index} {...project} />

                    return null
                })}
            </div>
        </div>
     
    )
}
