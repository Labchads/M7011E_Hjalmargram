import React, { Component } from "react";
import Cookies from 'js-cookie';
import { logout } from "../../actions/auth";
import AuthContext from "../../context/AuthContext";

class Logout extends Component 
{ 
    static contextType = AuthContext;
    render()
    {
        this.context.logoutUser(); 
        return(
            <article>   
                <p>Logging you out...</p>
		    </article>
        )
    }
}

export default Logout;