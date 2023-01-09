import React, { Component } from "react";
//import {Link} from 'react-router-dom';
import jek from "./pages/pfp/Jek9412.png";

console.log(jek);

class Follower extends Component{
    
    render(){
        return(
            <div class ="follower">
                <p>
                    <img src={this.props.pic} class="pfp" alt="pfp"/>
                    <b>
                        <a href="#">{this.props.displayName}
                            @{this.props.userName}
                        </a>
                    </b>
                    <button>Follow</button>
                </p>
            </div>
        )
    }
}

export default Follower;