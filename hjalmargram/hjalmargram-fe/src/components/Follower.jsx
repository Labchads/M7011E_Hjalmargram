import React, { Component } from "react";
import {Link} from 'react-router-dom';
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Follower extends Component{
    
    render(){
        return(
            <div class ="follower">
                <div>
                    <img src={this.props.pic} class="pfp" alt="pfp"/>
                    <div>
                        <Link to={`../profile/${this.props.userName}`}>{this.props.displayName}</Link><br/>
                        <p>
                            @{this.props.userName}</p>
                    </div>
                    <button>Follow</button>
                </div>
            </div>
            
        )
    }
}

export default Follower;