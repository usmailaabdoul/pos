import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Items from "./pages/items/items";
import Customers from "./pages/customers/customers";
import "./App.css";
import Login from "./pages/login/login";
import Settings from "./pages/settings/settings";
import Sales from "./pages/sales/sales";
import Employees from "./pages/employees/employees";
import Categories from "./pages/categories/categories";
import Reports from "./pages/reports/reports";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/customers" component={Customers} />
            <Route path="/sales" component={Sales} />
            <Route path="/employees" component={Employees} />
            <Route path="/categories" component={Categories} />
            <Route path="/settings" component={Settings} />

            <Route path="/reports" component={Reports} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
