import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import './css/profile.css'
import Follower from "../Follower";

class Followers extends Component
{
    username = window.location.pathname.split("/")[2];
    state = {
        user: getUserProfile(),
        user_id: 4,
        followers: [],
    }


    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then((res) => 
    {
    this.state.user_id = res.data[0].pk;
    return axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/followers`);
    })
    .then((res) => 
    {
        console.log(res.data.length);
    })
    .catch((error) => 
    {
        console.log(error);
    });

    render()
    {
        return(
            <article>
                <p>Followers: {this.state.followers.length}</p>
                {this.state.followers.map(
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

export default Followers;