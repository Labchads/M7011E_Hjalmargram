import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from 'axios';
import logo from "./img/logo.png";
import "./css/login.css";

console.log(logo)

class CreateAccount extends Component {
    state = {
        username: "",
        displayname: "",
        email: "",
        password: "",
        pfp: null,
    };

    onChangeUName = e => {
        this.setState({username: e.target.value });
    }

    onChangeDisName = e => {
        this.setState({displayname: e.target.value });
    }

    onChangeMail = e => {
        this.setState({email: e.target.value });
    }

    onChangePass = e => {
        this.setState({password: e.target.value });
    }

    onChangePic = e => {
        this.setState({pfp: e.target.files[0] });
    }

    render(){
        return(
            <article>
                <div class="login">
                    <img src={logo} class="logo"/><br/>
                    <h1>Welcome to Hjalmargram!</h1><br/>
                    <input type="text" username = "name" placeholder="Username" onChange={this.onChangeUName}/><br/><br/>
                    <input type="text" displayname = "name" placeholder="Displayname" onChange={this.onChangeDisName}/><br/><br/>
                    <input type="text" email = "name" placeholder="E-mail" onChange={this.onChangeMail}/><br/><br/>
                    <input type="password" password = "name" placeholder="Password" onChange={this.onChangePass}/><br/><br/>
                    <input type="file" onChange={this.onChangePic}/>
                    <br/>
                    <button type="submit" form="form1" value="Submit">Submit</button><br/>
                </div>
		    </article>
        )
    }
}

export default CreateAccount;