import React, { Component } from "react";
import Cookies from 'js-cookie';

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