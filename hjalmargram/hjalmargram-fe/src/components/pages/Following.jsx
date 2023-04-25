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
        user_id: 6,
        following: [],
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then((res) => 
    {
    this.setState({ user_id: res.data[0].pk });
    return axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/following`);
    })
    .then((res) => 
    {
        this.setState({following: res.data});
        console.log(res.data);
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
                            pic = {follower.user.pfp}
                            displayName = {follower.user.displayname}
                            userName = {follower.user.displayname}
                            /> ))}   
            </article>
        )
    }
}

export default Following;