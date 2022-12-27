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
        axios.post('http://localhost:8000/api/kapsylgram/create-account', this.state)
    };

    render(){
        return(
            <article>
                <div class="login">
                    <form method="POST">
                        <img src={logo} class="logo"/><br/>
                        <h1>Welcome to Hjalmargram!</h1><br/>
                        <input type="text" name="user" placeholder="Username"/><br/><br/>
                        <input type="text" name="email" placeholder="E-mail"/><br/><br/>
                        <input type="password" name="pass" placeholder="Password"/>
                    </form><br/>
                    <button type="submit" form="form1" value="Submit">Submit</button><br/>
                    <button type="submit" form="form1" value="Submit">Create account</button><br/>
                    <h2>OR</h2><br/>
                    <b>Login with google</b>
                </div>
		    </article>
        )
    }
}

export default Login;