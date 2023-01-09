import React, { Component } from "react";
import './css/DirectMessages.css'


class Chat extends Component
{
    render()
    {
        return(
            <div class={this.props.from != "sender" ? "me" : "notMe"}>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default Chat;