import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {enterUser} from "../Actions"
export default function Login() {
    const [redirect, setRedirect] = useState(false)
    const [warning, setWarning] = useState(false)
    const dispatch = useDispatch()
    const submitHandler = async(event) => {
        event.preventDefault()
        const {user,password} = event.target
        const data = {
            email: user.value,
            password: password.value
        }
        try {
            const res =  await axios.post(`/api/auth/login`, data)
            dispatch(enterUser(res.data))
            setRedirect(true) 
        } catch (e) {
            setWarning(true)
        }

       
    }
    if(redirect === true) {
        return <Redirect to = "/"/>
    }
    return  (
        <div className = "login">
            <div className = "login__container">
            <h3>Log In Below!</h3>
                <form onSubmit = {event => submitHandler(event)}>
                    <input required type = 'email' name = "user" placeholder = "Email"></input>
                    <input  required type = 'password' name = "password" placeholder = "Password"></input>
                    {warning ?  <p className = "login__warning">* Your Password or Email is typed in incorrectly</p> : ''}
                    <button type = "submit">Login!</button>
                </form>
            </div>
         
        </div>
    )
}
