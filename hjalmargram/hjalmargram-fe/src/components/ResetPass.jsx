
import React, { Component } from "react";
import axios from 'axios';
import { Form } from "reactstrap";
import AuthContext from "../context/AuthContext";

class ResetPass extends Component
{
    static contextType = AuthContext;
    state = {
        old_pass: "",
        new_pass: "",
    };

    onChangeOPass = e => 
    {
        this.setState({old_pass: e.target.value });
    }

    onChangeNewPass = e => 
    {
        this.setState({new_pass: e.target.value });
    }

    resetPassword = async e => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/kapsylgram/change-password/', {
            "username": this.context.user.username,
            "old_password": this.state.old_pass,
            "new_password": this.state.new_pass
        }, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            console.log(res)
            alert ("Success");
            window.location.reload();
        } );
    }

    mailUser = e =>
    {
        let formData = new FormData();
        formData.append('username', this.state.username);
         axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.state.username}`).then(res => {
            this.setState({ userdetails: res.data[0] });
            alert(this.state.username); 
        })  
    }

    render()
    {
        return(
            <article>
                <h2>Reset password</h2>
                <Form onSubmit={this.resetPassword}>
                    <p>Old Password:<br/>
                    <input type="password" onChange={this.onChangeOPass} required /></p>
                    <p>New Password:<br/>
                    <input type="password" onChange={this.onChangeNewPass} required /></p>
                    <button>Send new password</button>
                </Form>
            </article>
        );
    }
}

export default ResetPass;
