import React, { Component } from "react";
import './css/profile.css'
import Follower from "../Follower";

class Following extends Component
{
    
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
                    <Follower
                    pic = "https://i1.sndcdn.com/avatars-1izkebM3cqeF0hcO-uo8bjQ-t240x240.jpg"
                    displayName = "Gigachad2"
                    userName = "fredthebed"
                    />     
            </article>
        )
    }
}

export default Following;