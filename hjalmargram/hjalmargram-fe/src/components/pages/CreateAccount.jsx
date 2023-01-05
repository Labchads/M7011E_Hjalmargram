import React, { Component } from "react";
import { Form } from "reactstrap";
import axios from 'axios';
import logo from "./img/logo.png";
import "./css/login.css";

console.log(logo)

class CreateAccount extends Component {
    previewImage = null;
    pfp = null;
    err = "";
    state = {
        username: "",
        password: "",
        displayname: "",
        email: "",
        pfp: null,
        notifications: [],
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
        
        this.setState({pfp: e.target.files[0]});
        this.pfp = e.target.files[0];
        this.previewImage = URL.createObjectURL(e.target.files[0])
    }

    createAccount = e => {
        e.preventDefault();
        console.log(this.state);
        let formData = new FormData();
        // Update the formData object
        /* formData.append(
            "myFile",
            this.pfp,
            this.pfp.name
        ); */
        formData.append('pfp', this.state.pfp, this.state.pfp.name);
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        formData.append('displayname', this.state.displayname);
        formData.append('email', this.state.email);
        console.log(this.pfp);

        const response = axios.post('http://localhost:8000/api/kapsylgram/createacc', formData, {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res.data);
            //idk hur jag gör denna automated, we'll figure it out
        })
          .catch(err => "error")
        };
        
    

    render(){
        return(
            <article>
                <div class="login">
                    <img src={logo} class="logo" alt="logo"/><br/>
                    <h1>Welcome to Hjalmargram!</h1><br/>
                    <Form >
                        
                        <input type="text" username = "name" placeholder="Username" onChange={this.onChangeUName} required/><br/><br/>
                        <input type="text" displayname = "name" placeholder="Displayname" onChange={this.onChangeDisName} required/><br/><br/>
                        <input type="text" email = "name" placeholder="E-mail" onChange={this.onChangeMail} required/><br/><br/>
                        <input type="password" password = "name" placeholder="Password" onChange={this.onChangePass} required/><br/><br/>
                        <input type="file" accept="image/jpeg,image/png,image/gif" onChange={this.onChangePic}/>
                        
                        <br/><br/>
                        <p>preview of your pic:</p>
                        <img src={this.previewImage} class = "preview" alt="preview"/>
                        <h1>{this.state.username}</h1>
                        <h1>{this.state.displayname}</h1>
                        <h2>{this.err}</h2>
                        <button>Submit</button><br/>
                    </Form>
                </div>
		    </article>
        )
    }
}

export default CreateAccount;