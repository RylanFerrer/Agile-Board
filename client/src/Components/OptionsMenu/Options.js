import React, {useState} from 'react'
import OptionsMenu from "./OptionsMenu"
import OutsideClickHandler from 'react-outside-click-handler';
import more from "../../Assets/Images/more.svg"
export default function Options(props) {
    const [isOpened, setIsOpened] = useState(false)
    const toggle =()  => setIsOpened(!isOpened)
    const disabledValue = isOpened ? false : true

    return (
        <OutsideClickHandler disabled = {disabledValue} onOutsideClick={() => toggle()} >
            <img  alt = "more" onClick = {() => toggle()}  className = "options__icon options" src = {more}/>
            <OptionsMenu {...props} toggle = {toggle}isOpened = {isOpened} />
        </OutsideClickHandler>

    )
}
