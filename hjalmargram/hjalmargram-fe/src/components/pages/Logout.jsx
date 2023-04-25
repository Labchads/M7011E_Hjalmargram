import React, { Component } from "react";
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
                {window.location.href = "/"};
		    </article>
        )
    }
}

export default Logout;