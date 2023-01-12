import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import limpowitch from "./pfp/Limpowitch.png";
import skor from "./img/Skor.png";
import jek from "./pfp/Jek9412.png";
import kapsyloffer from "./pfp/Kapsyloffer.png";
import leifteorin from "./pfp/LeifTeorin.png";
import noposts from './img/noposts.gif';
import Comment from "./../Comment";
import './css/main.css';
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

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

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5);
        console.log('now');
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/admin`, null, {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization':'Bearer ' + String(this.context.authTokens.access)
        }
    }).then(res => {
        this.setState({ users: res.data });
    });

    render(){
        const isLogged = this.context.user!=null ? true : false;
        const users = this.state.users;
        //console.log(this.context);
        return(
            <div>
                {!users || users.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts} alt="noposts"/>
                        <p>You are not an admin, sorry. :/</p>
                    </article>
                ) : (
                <div>
                    {users.map(
                        user => (
                            <h1>{user.username}</h1>
                        )
                    )}
                </div>
                )}
                {/* <article class="Imgpost">
                    <div class="topOfPost">
                        <div>
                            <img src={limpowitch} class="pfp2"/>
                            <b>Limpowitch</b>
                        </div>
                        <div>
                            <span>3h ago</span>
                        </div>
                    </div>
                    <div class="image">
                        <img src={skor} onclick="location = 'imgpost.html'"/>
                    </div>
                    <div class="controls">
                        <button>3</button>
                        <b><a class="tag" href="profile.html">@Kapsyloffer</a> and 12 others like this.</b>
                    </div>
                    <hr/>
                    <div class="commentfield">
                        <Comment
                            comment_text = "lmao who did this?"
                            commentBy = "Limpowitch"
                            pic = {limpowitch}
                        />
                        <Comment
                            comment_text = "Not me bro. It's Kapsyloffer"
                            commentBy = "Jek9412"
                            pic = {jek}
                        />
                        <Comment
                            comment_text = "Nah bro I went home early frfr"
                            commentBy = "Kapsyloffer"
                            pic = {kapsyloffer}
                        />
                    </div>
                </article> */}
                {/* <article class="Textpost">
                    <div class="topOfPost">
                        <div class="topLeft">
                            <img src={kapsyloffer} class="pfp2"/>
                            <b>Kapsyloffer</b>
                        </div>
                        <div class="topRight">
                            <span>4h ago</span>
                        </div>
                    </div>
                    <hr/>
                    <div class="text" onclick="location = 'textpost.html'">
                        <p>Professorn sa pp pa lektionen lmao</p>
                    </div>
                    <hr/>
                    <div class="controls">
                        <button>&lt;3</button>
                        <b><a class="tag" href="profile.html">@LeifTeorin</a> and 3 others like this.</b>
                    </div>
                    <hr/>
                    <div class="commentfield">
                        <Comment
                            comment_text = "lmao"
                            commentBy = "jek9412"
                            pic = {jek}
                        />
                    </div>
                </article> */}
            </div>
        )
    }
}

export default AdminPage;