import React, { Component } from "react";
import Cookies from 'js-cookie';
import AuthContext from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

class Logout extends Component 
{ 
    static contextType = AuthContext;
    render()
    {
        this.context.logoutUser(); 
        return(
            <article>   
                <p>Logging you out...</p>
                {window.location.href = "/"};
		    </article>
        )
    }
}

export default Logout;