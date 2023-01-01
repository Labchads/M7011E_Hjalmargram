import React, { Component } from "react";
import {Link} from 'react-router-dom';
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Comment extends Component{
    
    render(){
        return(
            <div class ="comment">
                <img src={this.props.pic} class="pfp"/>
                <p><b><a class="commenter">@{this.props.commentBy}</a>:</b>{this.props.comment_text}</p>
            </div>
        )
    }
}

export default Comment;