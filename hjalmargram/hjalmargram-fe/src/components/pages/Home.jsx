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

class Home extends Component {
    static contextType = AuthContext;
    state = {
        posts: [],
        m: false,
        time: Date.now()
    }

    constructor(props) {
        super(props);
        this.likePost = this.likePost.bind(this);
    }
    
    makepostpage = e => {
        this.setState({m: !this.state.m})
    }

    loadMore = async e => {
        let currposts = this.state.posts;
        let res = axios.post(`http://localhost:8000/api/kapsylgram/`, {'last_post': currposts.length}).then(res => {
            let newposts = res.data;
            this.setState({ posts: currposts.concat(newposts) });
        });
    }

    likePost = e => {
        let res = axios.post(`http://localhost:8000/api/kapsylgram/post/${e.pk}/like`, {'username': this.context.user.username}, {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            /* if (this.context.user != null && e.likes.contains(this.context.user.user_id)){
                e.likes.remove(this.context.user.user_id);
            } else {
                e.likes.push(this.context.user.user_id);
            }
            console.log(this.state.posts); */
            this.getPosts();
        });
        
    }

    getPosts = async e => {
        let res = axios.get(`http://localhost:8000/api/kapsylgram/`).then(res => {
            this.setState({ posts: res.data });
        });
        console.log('getting posts')
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5);
        console.log(this.state.posts);
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
        console.log(this.state.posts);
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/`).then(res => {
        this.setState({ posts: res.data });
    });

    render(){
        const isLogged = this.context.user!=null ? true : false;
        const posts = this.state.posts;
        return(
            <div>
                <article>
                {isLogged ? <Link to="/makepost"> Make post </Link> : <p>Plz login to post</p>}
                </article>
                {!posts || posts.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts} alt="noposts"/>
                        <p>Noone has uploaded any posts yet. :/</p>
                    </article>
                ) : (
                <div>
                    {posts.map(
                        post => (
                            <Post post={this.state.post[0]}/>
                        )
                    )}
                    <article>
                        <button onClick={this.loadMore}>Load More</button>
                    </article>
                </div>
                )}
            </div>
        )
    }
}

export default Home;