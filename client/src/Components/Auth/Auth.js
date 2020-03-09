/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {Route} from 'react-router-dom'


export default function Auth({ component: Component, path}) {
  const [redirect, setRedirect] = useState(false)
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    let isSubscribed = true
      const fetchData = async() => {
        if(isSubscribed) {
        try {
          const res = await axios.get('/api/auth/checkToken')
          console.log(res)
          if (res.status === 200) {
            setLoading(false)
          } else {
            const error = new Error(res.error);
            throw error;
          }
        } catch (e) {
          setLoading(false)
          setRedirect(true)
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


/*
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        id: undefined,
        redirect: false,
      };
    }
    componentDidMount () {
      //eslint-disable-next-line
      axios.get('/api/auth/checkToken').then(res => {
        if (res.status === 200) {
          this.setState({ loading: false, id: res.data.id });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }) .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }
  
    render() {
      const { loading, redirect,id } = this.state;
 
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect id = {this.state.id} {...this.props} />
        </React.Fragment>
      );
    }
  }



*/