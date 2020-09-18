import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Login from "./pages/login/login";
import Sales from "./pages/sales/sales";

class App extends Component {

  render(){
    return (
        <div className={"container-fluid main-wrapper"}>
          <Router>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/sales" component={Sales}/>
                <Route path="/" component={Login}/>
            </Switch>
          </Router>
        </div>
    )
  }
}

export default App;
