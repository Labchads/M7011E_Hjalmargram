import React, { Component } from "react";
import { Form } from "reactstrap";
import axios from 'axios';
import logo from "./img/logo.png";
import "./css/login.css";
import './css/main.css'; 
import AuthContext from "../../context/AuthContext";

console.log(logo)

class MakePost extends Component {
    static contextType = AuthContext;
    previewImage = null;
    user = null;
    state = {
        content: "",
        picture: null,
//        postedBy: getUserProfile().user_id,
        comments: [],
//        likes: getUserProfile().user_id,
    };

    onChangeContent = e => {
        this.setState({content: e.target.value });
    }

    onChangePicture = e => {
        this.setState({picture: e.target.files[0] });
        this.previewImage = URL.createObjectURL(e.target.files[0])
    }

    makePost = async e =>{
        e.preventDefault();
        let formData = new FormData();
        /* await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.postedBy}`).then(res => {
            //this.userdetails = res.data[0];
            this.user = res.data[0];
            console.log(this.user);
        }); */
        formData.append('picture', this.state.picture, this.state.picture.name);
        formData.append('content', this.state.content);
        formData.append('postedBy', this.context.user.user_id);
        formData.append('comments', this.state.comments);
        formData.append('likes', this.context.user.user_id);
        //console.log(this.state.postedBy);
        //console.log(this.state.likes);
        console.log(formData);
        await axios.post('http://localhost:8000/api/kapsylgram/makepost', formData, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            window.location.href ="/";
            return <h1>{res.data['success']}</h1>
        })
        .catch(err => {
            console.log(err);
            this.context.logoutUser();
        });
    };

    render(){
        return(
            //Todo: Kolla om man är logged in annars redirect to login screen.
            <article>
                <div class="makepost">
                    <Form onSubmit={this.makePost}>
                        <img src={logo} class="logo" alt="logo"/><br/>
                        <h1>Make Post</h1><br/>
                        <p>Upload image:</p>
                        <input type="file" accept="image/jpeg,image/png,image/gif" onChange={this.onChangePicture}></input>
                        {this.previewImage ? 
                        <div class="image">
                            <p>preview of your pic:</p>
                            <img src={this.previewImage} alt="preview"/>
                        </div>
                        : null}
                        <p>Caption:</p>
                        <input type="text" onChange={this.onChangeContent}></input>
                        <button>Submit</button><br/>
                    </Form><br/>
                    
                </div>
		    </article>
        )
    }
}

export default MakePost;