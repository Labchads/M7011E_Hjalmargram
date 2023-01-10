import React, { Component } from "react";
import Cookies from 'js-cookie';
import { logout } from "../../actions/auth";

class Logout extends Component 
{ 
    render()
    {
        logout();
        window.location.href = "/";  
        return(
            <article>   
                <p>Logging you out...</p>
		    </article>
        )
    }
}

export default Logout;