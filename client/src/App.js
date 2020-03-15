import React from 'react';
import Board from './Components/Boards/Boards'
import "./Styles/main.css"
import {Route, Switch} from 'react-router-dom'
import Auth from "./Components/Auth/Auth"
import Login from "./Components/Login/Login"
import Dashboard from "./Components/Dashboard/Dashboard"
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path = "/login" component = {Login}/>
        <Auth component = {Board} path = "/project/:id/:name" />
        <Auth component = {Dashboard} path = "/"/>
      </Switch>
    </div>
  );
}

export default App;
