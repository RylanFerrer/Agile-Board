import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
export default function Login() {
    const [redirect, setRedirect] = useState(false)
    const submitHandler = async(event) => {
        event.preventDefault()
        const {user,password} = event.target
        const data = {
            email: user.value,
            password: password.value
        }
       const res =  await axios.post(`/api/auth/login`, data)
       if(res.status === 200) {
            setRedirect(true) 
       }
        else {
            alert('Error')
        }
    }
    if(redirect === true) {
        return <Redirect to = "/project"/>
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit = {event => submitHandler(event)}>
                <input type = 'email' name = "user" placeholder = "Email"></input>
                <input  type = 'password' name = "password" placeholder = "Password"></input>
                <button type = "submit">Login!</button>
            </form>
        </div>
    )
}
