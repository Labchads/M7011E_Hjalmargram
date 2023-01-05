import React, { Component } from "react";
import {Link} from 'react-router-dom';
class NotFound extends Component{
    
    render(){
        return(
            <article class="Error">
                <h1>ERROR 404</h1>
                <b>This page does not exist.</b>
                <br/>
                <img src="https://media.tenor.com/MwgSgD5TGmYAAAAM/liquidwifi.gif" alt="peanut butter jelly time"/>
                <br/>
                <Link to ="/"> Return home</Link>
            </article>
        )
    }
}

export default NotFound;