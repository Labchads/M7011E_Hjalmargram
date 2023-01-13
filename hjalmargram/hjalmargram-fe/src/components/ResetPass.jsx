
import React, { Component } from "react";
import axios from 'axios';
import { Form } from "reactstrap";

class ResetPass extends Component
{
    state = {
        username: "",
        userdetails : [],
    };

    onChangeUName = e => 
    {
        this.setState({username: e.target.value });
    }

    mailUser = e =>
    {
        let formData = new FormData();
        formData.append('username', this.state.username);
        res : axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.state.username}`).then(res => {
            this.setState({ userdetails: res.data[0] });
            alert(this.state.username); 
        })  
    }

    render()
    {
        return(
            <article>
                <h2>Reset password</h2>
                <Form onSubmit={this.mailUser}>
                <p>Username:<br/>
                <input type="text" name="username" onChange={this.onChangeUName} required /></p>
                <button>Send new password</button>
                </Form>
            </article>
        );
    }
}

export default ResetPass;
