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
    }

    render(){
        return(
            //Todo: Kolla om man är logged in annars redirect to login screen.
            <article>
                <div class="makepost">
                    <form method="POST">
                        <img src={logo} class="logo"/><br/>
                        <h1>Mae Post</h1><br/>
                        <p>Upload image:</p>
                        <input type="file" id="img" name="img" accept="image/*"></input>
                        <p>Caption:</p>
                        <textarea></textarea>
                    </form><br/>
                    <button type="submit" form="form1" value="Submit">Submit</button><br/>
                </div>
		    </article>
        )
    }
}

export default Login;