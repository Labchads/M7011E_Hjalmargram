import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import './css/profile.css'
import Follower from "../Follower";
class Following extends Component
{

    username = window.location.pathname.split("/")[2];
    state = {
        user: getUserProfile(),
        user_id: 4,
        following: [],
    }
    
    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then((res) => 
    {
    this.state.user_id = res.data[0].pk;
    return axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/following`);
    })
    .then((res) => 
    {
        this.state.following = res.data[0].another_user;
        console.log(res.data[0].another_user);
    })
    .catch((error) => 
    {
        console.log(error);
    });
    
    render()
    {
        return(
            <article>
                    <p>Following: {this.state.following.length}</p>
                {this.state.following.map(
                    follower => (
                        <Follower
                            pic = {follower.pfp}
                            displayName = {follower.displayname}
                            userName = {follower.displayname}
                        /> ))}   
            </article>
        )
    }
}

export default Following; 