import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import logo from "./img/logo.png";
import "./css/login.css";

console.log(logo)

class Login extends Component {

    state = {
        username: "",
        email: "",
        password: ""
    };

    loginAccount = e =>{
        e.preventDefault();
        //TODO
        alert("Login details:" + "{this.state.username}");
    };

    render(){
        return(
            <article>
                <div class="login">
                    <form onSubmit={this.login}>
                        <img src={logo} class="logo"/><br/>
                        <h1>Welcome to Hjalmargram!</h1><br/>
                        <input type="text" name="user" placeholder="Username" required/><br/><br/>
                        <input type="password" name="pass" placeholder="Password" required/>
                    </form><br/>
                    <button type="submit" form="form1" value="Submit">Login</button><br/>
                    <button onClick ={this.props.n}>Create Account</button><br/>
                </div>
		    </article>
        )
    }
}

export default Login;