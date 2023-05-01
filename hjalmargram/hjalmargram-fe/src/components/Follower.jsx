import React, { Component } from "react";
import {Link} from 'react-router-dom';
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Follower extends Component{
    
    render(){
        return(
            <div class ="follower">
                <div>
                <p><img src={this.props.pic == null ? jek : this.props.pic} class="pfp" alt="pfp"/><br/>
                    <Link to={`../profile/${this.props.userName}`}>{this.props.displayName}</Link>@{this.props.userName}</p>
                </div>
            </div>
            
        )
    }
}

export default Follower;