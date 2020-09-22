import {Component} from "react";
import React from "react";
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
            let token = await apis.authApi.login({
                username,
                password
            })
            apis.initialize(token.token)
            this.props.history.push("/sales")
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
            <div className={"main-container d-flex justify-content-center align-items-center"}>
                <div>
                    <div className={"text-center my-4"}>
                        <span className={"h2 welcome-heading"}>Login to POS</span>
                    </div>
                    <form className={"login-form form"} onSubmit={this.handleSubmit}>
                        <div className={"form-group"}>
                            <input name="username" placeholder="username" value={username} onChange={this.handleInput} type="text" className={"form-control input"}/>
                        </div>
                        <div className={"form-group"}>
                            <input name="password" placeholder="password" value={password} onChange={this.handleInput} type="password" className={"form-control input"}/>
                        </div>
                        <div>
                            <button className="btn btn btn-primary btn-block mt-2"><span className="h5">Login</span></button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;