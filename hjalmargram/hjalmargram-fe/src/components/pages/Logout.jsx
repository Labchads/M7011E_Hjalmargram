import React, { Component, useContext } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import logo from "./img/logo.png";

class Logout extends Component 
{ 
    render()
    {
        Cookies.remove('jwt')
        window.location.href = "/";  
        return(
            <article>   
                <p>Logging you out...</p>
		    </article>
        )
    }
}

export default Logout;