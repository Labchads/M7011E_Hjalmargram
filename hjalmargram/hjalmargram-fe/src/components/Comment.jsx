import React, { Component } from "react";
import {Link} from 'react-router-dom';
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Comment extends Component{
    
    render(){
        return(
            <div class ="comment">
                <p><img src={this.props.pic} class="pfp" alt="pfp"/> 
                <b> <Link to = {`/profile/${this.props.commentBy}`} class="commenter">@{this.props.commentBy}</Link>:  </b>{this.props.comment_text}</p>
            </div>
        )
    }
}

export default Comment;