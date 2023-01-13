import React, { Component } from "react";
//import AuthContext from "../../context/AuthContext";
import Cookies from 'js-cookie';
import { Form } from "reactstrap";
import axios from 'axios';
import logo from "./img/logo.png";
import "./css/login.css";
//import { Connect , connect} from "react-redux";
//import CSRFToken from "../CSRFToken";
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import AuthContext from "../../context/AuthContext";
import { AuthProvider } from "../../context/AuthContext";

console.log(logo)

class Login extends Component {
    static contextType = AuthContext;
    state = {
        username: "",
        password: ""
    };

    onChangeUName = e => {
        this.setState({username: e.target.value });
    }

    onChangePassword = e => {
        this.setState({password: e.target.value });
    }

    loginAccount = e => {
        /* e.preventDefault();
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        };

        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        
        const res = axios.post('http://localhost:8000/api/kapsylgram/login', formData, config).then(response => {
            console.log(response.data['token'])
            const token = response.data['token'];
        // Store the JWT in a cookie
            document.cookie = `jwt=${token}`;
        // Set the JWT as a default header for all axios requests
            axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
            const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
            if (!jwt) {
            // No JWT is stored in the cookie, so the user is not logged in
                return null;
            }
            const decodedJwt = jwtDecode(jwt);
            // The decoded JWT contains the user's information
            console.log(decodedJwt);
            window.location.href = "/";
        }) */
        e.preventDefault();
        this.context.loginUser(this.state.username, this.state.password);
    };

    render(){
        return(
            <article>
                <div class="login">
                    <Form onSubmit={this.loginAccount}>
                        <img src={logo} class="logo" alt="logo"/><br/>
                        <h1>Welcome to Hjalmargram!</h1><br/>
                        <input type="text" name="user" placeholder="Username" onChange={this.onChangeUName} required/><br/><br/>
                        <input type="password" name="pass" placeholder="Password" onChange={this.onChangePassword} required/><br/><br/>
                        <button>Log in</button><br/>
                    </Form>
                    <br/>
                    <Link to="/createaccount">Create account</Link><br/>
                    
                </div>
		    </article>
        )
    }
}

export default Login;