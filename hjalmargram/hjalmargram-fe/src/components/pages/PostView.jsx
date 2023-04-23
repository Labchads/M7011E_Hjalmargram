import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import './css/main.css';
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Post from "./../Post";

class PostView extends Component {
    static contextType = AuthContext;
    postid = window.location.pathname.split("/")[2];
    state = {
        user: getUserProfile(),
        post: [],
        m: false,
        time: Date.now()
    }
    
    makepostpage = e => {
        this.setState({m: !this.state.m})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5);
        console.log('now');
        axios.get(`http://localhost:8000/api/kapsylgram/post/${this.postid}`).then(res => {
          this.setState({ post: res.data });
        });
      }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const isLogged = this.context.user!=null ? true : false;
        const post = this.state.post;
        return(
            <div>
                <article>
                {isLogged ? <Link to="/makepost"> Make a post Mr.{this.context.user.username} </Link> : <p>Plz login to post</p>}
                </article>
                {!post || post.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts} alt="noposts"/>
                        <p>Not found</p>
                        <Link to="../">Go back home</Link>
                    </article>
                ) : (
                <div>
                    {post.map(
                        postobj => (
                            <div>
                            <Post post={postobj}/>
                            </div>
                        )
                        )}
                </div>
                )}
            </div>
        )
    }
}

export default PostView;