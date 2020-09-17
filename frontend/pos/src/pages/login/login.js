import {Component} from "react";
import React from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import apis from '../../apis/apis'

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    handleInput = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = async event => {
        event.preventDefault()

        const {username, password} = this.state
        apis.initialize('')
        try{
            let token = await apis.auth().login({
                username,
                password
            })
            console.log(token)
            apis.initialize(token)
            Swal.fire({
                icon: 'success',
                title: 'Login',
                text: 'login successful'
            })
        }catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: e.message
            })
        }
    }

    render() {
        let {username,password} = this.state
        return (
            <div className={"main-container row h-100 justify-content-center align-items-center"}>
                <div className={"col-md-4"}>
                    <div className={"text-center my-4"}>
                        <span className={"h3 welcome-heading"}>Login to pos</span>
                    </div>
                    <form className={"login-form m-4 px-5 py-5"} onSubmit={this.handleSubmit}>
                        <div className={"form-group"}>
                            {/* <label>Username</label> */}
                            <input name="username" placeholder="username" value={username} onChange={this.handleInput} type="text" className={"form-control input"}/>
                        </div>
                        <div className={"form-group"}>
                            {/* <label>Password</label> */}
                            <input name="password" placeholder="password" value={password} onChange={this.handleInput} type="password" className={"form-control input"}/>
                        </div>
                        <div>
                            <input type="submit" className={"login-btn btn btn-block grow"} value="Login"/>
                        </div>
                        <div className={"mt-2"}>
                            <span>Don't have an account? <Link to="/signup">Sign up</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login