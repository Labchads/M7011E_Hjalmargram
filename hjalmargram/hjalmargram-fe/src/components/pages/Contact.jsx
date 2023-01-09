import React, { Component } from "react";
import './css/DirectMessages.css'


class Contact extends Component
{
    render()
    {
        return(
            <div class = "contact">
            <img src={this.props.pfp} alt="pfp"/>
            <b>{this.props.name}</b>
            <p>{this.props.lastMsg}</p>
            </div>
        );
    }
}

export default Contact;