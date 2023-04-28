import React, { Component } from "react";
import { Form } from "reactstrap";
import axios from 'axios';
import logo from "./pages/img/logo.png";
import "./pages/css/login.css";
import './pages/css/main.css'; 
import AuthContext from "../context/AuthContext";

console.log(logo)

class CommentField extends Component {
    static contextType = AuthContext;


    state = {
        comment_on: 0,
        comment_text: "",
        sender_id: this.context.user_id,
    };

    setPost = e =>
    {
        this.state.comment_on= this.props.comment_on;
    }

    onChangeText = e => {
        this.setState({comment_text: e.target.value });
        //console.log(this.state.comment_text);
    }

    makeComment = async e =>{
        e.preventDefault();
        let formData = new FormData();

        this.setPost();

        let newDate = new Date();
        let today = newDate.getTime().toFixed();

        if(this.state.comment_text.length < 2)
        {
            //alert("Nah");
            return;
        }

        //Comment data
        formData.append('text', this.state.comment_text);
        formData.append('sender', this.context.user.username);

        
        //console.log(this.state.comment_on);
        //console.log(this.state.comment_text);
        //console.log(today);
        //console.log(this.context.user.username);
        //console.log(formData);

        await axios.post(`http://localhost:8000/api/kapsylgram/post/${this.state.comment_on}/makecomment`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            window.location.href =`/post/${this.state.comment_on}/`;
            //console.log(res)
        })
        .catch(err => {
            console.log(err);
        });
    };

    render(){
        return(
            <div class="makeComment">
                <Form onSubmit={this.makeComment}>
                    <p>Comment:</p>
                    <input type="text" onChange={this.onChangeText}></input>
                    <button>Submit</button><br/>
                </Form><br/>
            </div>
        )
    }
}

export default CommentField;