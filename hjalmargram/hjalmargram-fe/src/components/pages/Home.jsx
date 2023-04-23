import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import './css/main.css';
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Post from "./../Post";

class Home extends Component {
    static contextType = AuthContext;
    state = {
        user: getUserProfile(),
        posts: [],
        hasPosts: true,
        m: false,
        time: Date.now()
    }
    
    makepostpage = e => {
        this.setState({m: !this.state.m})
    }

    loadMore = async e => {
        let currposts = this.state.posts;
        let res = axios.post(`http://localhost:8000/api/kapsylgram/`, {'last_post': currposts.length}).then(res => {
            let newposts = res.data;
            this.setState({ posts: currposts.concat(newposts) });
            if(newposts.length < 5)
            {
                this.state.hasPosts = false;
            }
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5);
        console.log('now');
        axios.get(`http://localhost:8000/api/kapsylgram/`).then(res => {
          this.setState({ posts: res.data });
        });
      }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(){
        const isLogged = this.context.user!=null ? true : false;
        const posts = this.state.posts;
        return(
            <div>
                <article>
                {isLogged ? <Link to="/makepost"> Make post Mr.{this.context.user.username} </Link> : <p>Plz login to post</p>}
                </article>
                {!posts || posts.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts} alt="noposts"/>
                        <p>Noone has uploaded any posts yet. :/</p>
                    </article>
                ) : (
                <div>
                    {posts.map(
                        postobj => (
                            <div>
                            <Post post={postobj}/>
                            </div>
                        )
                        )}
                        
                    <article style={!this.state.hasPosts ? {display: "none"} : {}}>
                        <button onClick={this.loadMore}>Load More</button>
                    </article>
                </div>
                )}
            </div>
        )
    }
}

export default Home;