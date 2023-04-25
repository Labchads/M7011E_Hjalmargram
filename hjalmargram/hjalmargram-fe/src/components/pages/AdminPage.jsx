import React, { Component } from "react";
import axios from 'axios';
import limpowitch from "./pfp/Limpowitch.png";
import skor from "./img/Skor.png";
import jek from "./pfp/Jek9412.png";
import kapsyloffer from "./pfp/Kapsyloffer.png";
import leifteorin from "./pfp/LeifTeorin.png";
import noposts from './img/noposts.gif';
import './css/main.css';
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);
console.log(leifteorin);

class AdminPage extends Component {
    static contextType = AuthContext;
    state = {
        users: [],
        m: false,
        time: Date.now()
    }

    getUsers = async() => {
        await axios.get(`http://localhost:8000/api/kapsylgram/admin`, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            this.setState({ users: res.data });
        }); 
    };

    deleteUser = async (userID) => {
        await axios.post('http://localhost:8000/api/kapsylgram/deleteuser', {'userID' : userID}, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            if (res.status === 200){
                this.getUsers();
            }
        })
    };

    res = axios.get(`http://localhost:8000/api/kapsylgram/admin`, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(this.context.authTokens.access)
        }
    }).then(res => {
        this.setState({ users: res.data });
    }); 

    /* response = fetch("http://localhost:8000/api/kapsylgram/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization':'Bearer '+String(this.context.authTokens.access)
      },
    }).then(res => {
        if (res.status === 200) {
            this.setState({ users: res.json()});
        } 
    }); */
    
    render(){
        //const isLogged = this.context.user!=null ? true : false;
        const users = this.state.users;
        return(
            <div>
                {!users || users.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts} alt="noposts"/>
                        <p>You are not an admin, sorry. :/</p>
                    </article>
                ) : (
                <article>
                    {
                        users.map(
                            user => (
                                <div>
                                    <hr/>
                                        <Link to = {`/profile/${user.username}`}>{user.username}</Link>
                                        <h6>{user.pk}</h6>
                                        <h5>{user.displayname}</h5>
                                        <h5>{user.email}</h5>
                                        <img src={user.pfp != null ? user.pfp : leifteorin} class = 'pfp' alt='pfp'/>
                                        <button> Delete user </button>
                                    <hr/>
                                    <br/><br/>
                                </div>
                            )
                        )
                    }
                </article>
                )}
            </div>
        )
    }
}

export default AdminPage;