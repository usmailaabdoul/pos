import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Items from './pages/items/Items'
import CustomersPage from "../src/pages/customers/CustomersPage";
import "./App.css";
import Login from "./pages/login/login";
import Sales from "./pages/sales/sales";
import Employees from "./pages/employees/employees";
import Categories from "./pages/categories/categories";

class App extends Component {

  render(){
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/customers" component={CustomersPage} />
            <Route path="/sales" component={Sales} />
            <Route path="/employees" component={Employees}/>
            <Route path="/categories" component={Categories}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
