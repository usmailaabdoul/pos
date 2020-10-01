import React, { useState, useEffect } from "react";
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
import apis from '../src/apis/apis'
import Alert from 'react-bootstrap/Alert'
import Swal from "sweetalert2";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom'

const App = ({ token }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [dontShow, setDontShow] = useState(false)
    const [items, setItems] = useState([]);

    useEffect(() => {
        setInterval(getItems, 10000)
        setDontShow(true)
    }, [])

    useEffect(() => { checkLow() }, [items])

    const getItems = async () => {
        try {
            let res = await apis.itemApi.items();
            setItems(res);

        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: e.message,
            });
        }
    }

    const checkLow = () => {
        items.forEach(item => {
            if (item.qty < item.minStock) {
                setInterval(setShowAlert(!showAlert), 1000)
            }
        });
    }

    const NotFound = () => {

        return (
            <div>
                {!token.length > 0 ?
                    <div className="main-container d-flex justify-content-center align-items-center flex-column">
                        <h1>Log in to continue</h1>
                        <h5>Not verified</h5>
                        <button className="btn btn-primary" ><a href="/login" style={{ color: 'white' }}>go to login</a></button>
                    </div>
                    :
                    <div className="main-container d-flex justify-content-center align-items-center flex-column">
                        <h1 style={{ fontSize: '5rem' }}>404</h1>
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

                            {
                                showAlert && dontShow ?
                                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                                        <Alert.Heading>Oh snap! You have a few low stock items!</Alert.Heading>
                                        <p>
                                            We have noticed there are a few items which are low in stock.
                                            We suggest you check them out now before they completely run out.
                                            </p>
                                        <hr />
                                        <div className="d-flex justify-content-end">
                                            <button onClick={() => setDontShow(false)} type="button" class="btn btn-outline-danger">
                                                Don't Show again
                                                </button>

                                            <button onClick={() => setShowAlert(false)} type="button" class="btn btn-outline-danger">
                                                Dismiss
                                                </button>

                                            <button onClick={() => setDontShow(false)} type="button" class="btn btn-outline-primary">
                                                <Link to={{ pathname: "/items", state: { showLowStock: true } }}>
                                                    <span className="ml-3">Check Items</span>
                                                </Link>
                                            </button>
                                        </div>
                                    </Alert> :
                                    " "
                            }
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
