import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Items from "../src/pages/ItemsPage/Items";
import CustomersPage from "../src/pages/CustomersPage/CustomersPage";
import Navbar from "../src/Components/Navbar";
import "./App.css";
import Login from "./pages/login/login";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" component={Login} exact={true} />
            <Route path="/login" component={Login} />
            <Route path="/items" component={Items} />
            <Route path="/customers" component={CustomersPage} />
            <Route path="/sales" component={Items} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
