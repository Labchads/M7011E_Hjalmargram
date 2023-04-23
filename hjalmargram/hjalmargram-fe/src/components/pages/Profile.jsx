import React, { Component } from "react";
import {Link} from "react-router-dom";
import './css/profile.css'
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import challe from './pfp/LeifTeorin.png';

let view = 0;

class Profile extends Component{
    username = window.location.pathname.split("/")[2];
    state = {
        user: getUserProfile(),
        userdetails: [],
        posts: [],
        followercount: 0,
        followingcount: 0,
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then(res => {
        //this.state.userdetails = res.data[0];
        this.setState({ userdetails: res.data[0] });
        //console.log(this.state.userdetails);
    });
    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}/posts`).then(res => {
        this.setState({ posts: res.data });
        //console.log(res.data);
        //this.state.posts = res.data;
    }).catch(err => console.log(err))

    getUser = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then(res => {
            //this.userdetails = res.data[0];
            this.setState({ userdetails: res.data[0] });
            //console.log(this.state.userdetails);
        });
    };

    getPosts = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}/posts`).then(res => {
            //this.userdetails = res.data[0];
            this.setState({ posts: res.data});
            //console.log(this.state.userdetails);
        });
    };

    resetState = () => {
        this.getUser();
        this.getPosts();
    };

    render(){
        //this.getUser();
        const userdetails = this.state.userdetails;
        /* if(userdetails == null){
            return <NotFound/>
        } */
        const posts = this.state.posts;
        const followercount = this.state.followercount;
        const followingcount = this.state.followingcount;
        console.log(posts);
        return(
                <div>
                    <article class = "profilepic">
                        {userdetails.pfp != null ? <img src={userdetails.pfp} alt="#"/> : <img src={challe} alt="#"/>}
                        <h2>{userdetails.displayname}</h2>
                        <b>@{userdetails.username}</b>
                        <br/>
                        <div class = "profileinfo">
                            <b>Posts:<br/>{posts.length}</b><Link to="./Followers"><b>Followers:</b><br/>{followercount}</Link><Link to="./Following"><b>Following:</b><br/>{followingcount}</Link>
                        </div>
                        <br/>
                        <div class="followbuttons">
                            { 0 ? <button onclick="location='https://youtu.be/O_IYLqIjtMg?t=17'">Follow</button> : <button>Unfollow</button>}
                            <button> DM </button>
                        </div>
                        <br/>
                        <p class="bio"><b>"</b>Live laugh love.<b>"</b></p>
                    </article>
                    {/* <article class="buttons">
                        <button>Images</button> 
                        <button>Videos</button>
                        <button>Texts</button>
                    </article> */}
                    {!posts || posts.length <= 0 ? (
                        <article class="noposts">
                            <img src={noposts} alt="¨No posts :("/>
                            <p><b>@{userdetails.username}</b> has not uploaded any posts yet. :/</p>
                        </article>
                    ) : (
                        <article class="imgposts">
                            {posts.map(post => (
                                <div class="image">
                                    {console.log(post)}
                                <Link to={`../post/${post.pk}`}>
                                    <img src={post.picture} alt="post"/>
                                    </Link>
                                </div>
                            ))}
                        </article>
                    )}
                    {/* <article class="textposts">
                        
                    </article> */}
                </div>
        )
    }
}

export default Profile;