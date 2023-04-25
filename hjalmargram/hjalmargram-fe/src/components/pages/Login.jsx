import React, { Component } from "react";
//import AuthContext from "../../context/AuthContext";
import { Form } from "reactstrap";
import logo from "./img/logo.png";
import "./css/login.css";
import { Link } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";

console.log(logo)

class Login extends Component {
    static contextType = AuthContext;
    state = {
        username: "",
        password: ""
    };

    onChangeUName = e => {
        this.setState({username: e.target.value });
    }

    onChangePassword = e => {
        this.setState({password: e.target.value });
    }

    loginAccount = e => {
        e.preventDefault();
        this.context.loginUser(this.state.username, this.state.password);
    };

    render(){
        return(
            <article>
                <div class="login">
                    <Form onSubmit={this.loginAccount}>
                        <img src={logo} class="logo" alt="logo"/><br/>
                        <h1>Welcome to Hjalmargram!</h1><br/>
                        <input type="text" name="user" placeholder="Username" onChange={this.onChangeUName} required/><br/><br/>
                        <input type="password" name="pass" placeholder="Password" onChange={this.onChangePassword} required/><br/><br/>
                        <button>Log in</button><br/>
                    </Form>
                    <br/>
                    <Link to="/createaccount">Create account</Link><br/>
                    
                </div>
		    </article>
        )
    }
}

export default Login;