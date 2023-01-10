import React, { Component } from "react";
import {Link} from "react-router-dom";
import { useLocation} from "react-router-dom";
import './css/profile.css'
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import challe from './pfp/LeifTeorin.png';
import NotFound from "../NotFound";

//import {useParams} from "react-router-dom";

//TODO:
//Get profile ID
//Profilepic = profile.src_pfp
//Fetch all images as images[], should contain ID, src, likecount, commentcount
//Foreach img in images[] : 
/*
<div class="image">
    <img src="img.src" / onClick = {(e) => imgPost(img.ID)}>
    <span>Likes: img.like_c</span>
    <span>Comments: img.com_c</span>
</div>
*/      //Or something
//Om man klickar på textposts, fetcha alla textposts, samma sak, visa comment count och likes osv
//Kanske typ: 
/*
<div class="textpost">
<p>txt.content</p>
<span>Likes: txt.likes</span> <span>Comments: txt.com</span>
</div>
*/

//TODO: Gör också dessa till components:
/*
 <article class="imgposts">
    ...
</article>
<article class="textposts">
    ...
</article>
<article class="videoposts">
    ...
</article>
<article class="noposts">
    <img src="img/noposts.gif"/>
    <p><b>_USERNAME</b> has not uploaded any posts yet. :/</p>
</article>
*/


let view = 0;
var username = window.location.pathname.split("/")[2];

class Profile extends Component{
    state = {
        user: getUserProfile(),
        userdetails: [],
        posts: [],
        followercount: 0,
        followingcount: 0,
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${username}`).then(res => {
        //this.state.userdetails = res.data[0];
        this.setState({ userdetails: res.data[0] });
        //console.log(this.state.userdetails);
    });
    res = axios.get(`http://localhost:8000/api/kapsylgram/profilename/${username}/posts`).then(res => {
        this.setState({ posts: res.data });
        //console.log(res.data);
        //this.state.posts = res.data;
    }).catch(err => console.log(err))

    getUser = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${username}`).then(res => {
            //this.userdetails = res.data[0];
            this.setState({ userdetails: res.data[0] });
            //console.log(this.state.userdetails);
        });
    };

    getPosts = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${username}/posts`).then(res => {
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
        if(userdetails == null){
            return <NotFound/>
        }
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
                        <Link to="/settings">Settings</Link>
                    </article>
                    <article class="buttons">
                        <button>Images</button> {/* Img är default */}
                        <button>Videos</button>
                        <button>Texts</button>
                    </article>
                    {!posts || posts.length <= 0 ? (
                        <article class="noposts">
                            <img src={noposts} alt="¨No posts :("/>
                            <p><b>@{userdetails.username}</b> has not uploaded any posts yet. :/</p>
                        </article>
                    ) : (
                        <article class="imgposts">
                            {posts.map(post => (
                                <div class="image">
                                    <img src={post.picture} alt="post"/>
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