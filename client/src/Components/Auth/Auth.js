/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {enterUser} from "../Actions"


export default function Auth({ component: Component, path}) {
  const [redirect, setRedirect] = useState(false)
  const [loading,setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(
    () => {
    let isSubscribed = true
      const fetchData = async() => {
        if(isSubscribed) {
        try {
          const res = await axios.get('/api/auth/checkToken')
          if (res.status === 200) {
            dispatch(enterUser(res.data.userInfo))
            setLoading(false)
          } else {
            const error = new Error(res.error);
            throw error;
          }
        } catch (e) {
          setLoading(false)
          setRedirect(true)
          console.log(e)
        }
      }
      }
       fetchData()
      return () => isSubscribed = false
  }, [setRedirect, redirect])
  if(loading === true) {
    return <div></div>
  }  
  if (redirect === true) {
    return <Redirect to="/" />;
  }
  return (
    <Route path = {path} component = {Component}/>
  )
}
