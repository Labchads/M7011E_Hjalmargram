import React, { Component } from "react";
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Comment extends Component{
    render(){
        return(
            <div class ="comment">
                <img src={jek} class="pfp"/>
                <p><b><a href="profile.html" class="commenter">@Jek9412</a>:</b>: lmao</p>
            </div>
        )
    }
}

export default Comment;