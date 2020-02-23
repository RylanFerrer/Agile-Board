import React from 'react';
import Board from './Components/Boards/Boards'
import "./Styles/main.css"
import {Route, Switch} from 'react-router-dom'
import Auth from "./Components/Auth/Auth"
function App() {
  return (
    <div className="App">
      <h1>Jira Board</h1>
      <Switch>
        <Route  component = {Auth(Board)}/>
      </Switch>
      <Board/>
    </div>
  );
}

export default App;
