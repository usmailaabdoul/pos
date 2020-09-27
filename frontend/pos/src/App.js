import React, { useState } from "react";
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
import Navbar from "./components/Navbar/Navbar";
import { connect } from "react-redux";

const App = ({token}) => {

  const NotFound = () => {

    return (
      <div>
        {!token.length > 0 ?
          <div className="main-container d-flex justify-content-center align-items-center flex-column">
            <h1>Log in to continue</h1>
            <h5>Not verified</h5>
            <button className="btn btn-primary" ><a href="/login" style={{color: 'white'}}>go to login</a></button>
          </div>
          :
          <div className="main-container d-flex justify-content-center align-items-center flex-column">
            <h1 style={{fontSize: '5rem'}}>404</h1>
            <h1>page not found</h1>
            <h5>wrong route</h5>
          </div>
        }
      </div>
    )
  }

  return (
    <div className="app">
      <Router>
        {
          !token.length > 0 ?

            <Switch>
              <Route path="/" component={Login} exact={true} />
              <Route path="/login" component={Login} />
              <Route component={NotFound} />
            </Switch>
            :
            <>
              <Navbar />
              <Switch>
                <Route path="/" component={Sales} exact={true} />
                <Route path="/items" component={Items} />
                <Route path="/customers" component={Customers} />
                <Route path="/sales" component={Sales} />
                <Route path="/employees" component={Employees} />
                <Route path="/categories" component={Categories} />
                <Route path="/settings" component={Settings} />
                <Route path="/reports" component={Reports} />
                <Route component={NotFound} />
              </Switch>
            </>
        }
      </Router>
    </div>
  );
}

const mapStatesToProps = ({ auth }) => {
  return {
    token: auth.token
  }
}

export default connect(mapStatesToProps, null)(App);
