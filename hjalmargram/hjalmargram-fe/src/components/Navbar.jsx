import Dropdown from "./dropdown";
import {React, Component} from "react";
import { Link } from "react-router-dom";


class Navbar extends Component 
{
    
    render() 
    {
        var isLogged = this.props.isLogged;
        var user = this.props.user;
        return(
            <nav className="Top">
                <h2><Link to="/">Hjalmargram</Link></h2>
                {user != null ? <Link to={`/profile/${user.username}`} onClick="window.location.reload();">Profile</Link> : null /*Det här är så janky holy shit*/} 
                {/*isLogged ? <Link to="/dms">Direct Messages</Link> : null*/}
                {isLogged && user.is_admin ? <a href="http://localhost:8000/admin/">Admin Stuff</a> : null}
                {isLogged ? <Link to="/resetpassword">Change Password</Link> : null}
                <div>
                {isLogged ? <Link to="/logout">Log out</Link> : <Dropdown options={["Not logged in", "Login", "Create Account"]} paths={["/", "/login", "/createaccount"]}/>}
                </div>
            </nav>
        );
    }
}

export default Navbar;