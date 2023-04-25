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
        user_id: 0,
        followers: [],
    }


    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then(res => {
        this.state.user_id = res.data[0].pk;
    });

    res = axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/followers`).then(res => {
        console.log(res.data);
    });

    render()
    {
        return(
            <article>
                    {/*foreach follower of user*/}
                    <Follower
                    pic = "https://i1.sndcdn.com/avatars-1izkebM3cqeF0hcO-uo8bjQ-t240x240.jpg"
                    displayName = "Gigachad"
                    userName = "fred"
                    />   
            </article>
        )
    }
}

export default Followers;