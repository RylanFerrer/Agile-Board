import React,{useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {enterUser} from "../Actions"
export default function Login() {
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()
    const submitHandler = async(event) => {
        event.preventDefault()
        const {user,password} = event.target
        const data = {
            email: user.value,
            password: password.value
        }
       const res =  await axios.post(`/api/auth/login`, data)
       if(res.status === 200) {
            dispatch(enterUser(res.data))
            setRedirect(true) 
       }
        else {
            alert('Error')
        }
    }
    if(redirect === true) {
        return <Redirect to = "/dashboard"/>
    }
    return  (
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
