import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Items from "../src/pages/ItemsPage/Items";
import CustomersPage from "../src/pages/CustomersPage/CustomersPage";
import Navbar from "../src/components/Navbar";
import "./App.css";
import Login from "./pages/login/login";
import Sales from "./pages/sales/sales";
import Employees from "./pages/employees/employees";

class App extends Component {

  render(){
    return (
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/customers" component={CustomersPage} />
            <Route path="/sales" component={Sales} />
            <Route path="/employees" component={Employees}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
