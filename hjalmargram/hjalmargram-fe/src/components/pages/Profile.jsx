import React, { Component } from "react";
import './css/profile.css'
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import challe from './pfp/LeifTeorin.png';

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

class Profile extends Component{
    //userdetails = null;
    state = {
        user: getUserProfile(),
        userdetails: [],
        posts: [],
        followercount: 0,
        followingcount: 0,
    }
    res = axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user.user_id}`).then(res => {
        //this.userdetails = res.data[0];
        this.setState({ userdetails: res.data[0] });
        //console.log(this.state.userdetails);
    });
    res = axios.get(`api/kapsylgram/profile/${this.state.user.user_id}/posts`).then(res => {
        this.setState({ posts: res.data });
        console.log(res.data);

    }).catch(err => console.log('re'))

    componentDidMount() {
        this.resetState();
    }

    getUser = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user.user_id}`).then(res => {
            //this.userdetails = res.data[0];
            this.setState({ userdetails: res.data[0] });
            //console.log(this.state.userdetails);
        });
    };

    getPosts = async () => {
        await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user.user_id}/posts`).then(res => {
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
        const posts = this.state.posts;
        console.log(userdetails.pfp);
        return(
                <div>
                    <article class = "profilepic">
                        {userdetails.pfp != null ? <img src={userdetails.pfp}/> : <img src={challe}/>}
                        <h2>{userdetails.displayname}</h2>
                        <b>@{userdetails.username}</b>
                        <br/>
                        <div class = "profileinfo">
                            <b>Posts:<br/>{posts.length}</b><a href="#"><b>Followers:</b><br/>{this.props.followers}</a><a href="#"><b>Following:</b><br/>{this.props.following}</a>
                        </div>
                        <br/>
                        <div class="followbuttons">
                            <button onclick="location='https://youtu.be/O_IYLqIjtMg?t=17'">Follow</button>
                            <button> DM </button>
                        </div>
                        <br/>
                        <p class="bio"><b>"</b>Live laugh love.<b>"</b></p>
                    </article>
                    <article class="buttons">
                        <button>Images</button>
                        <button>Videos</button>
                        <button>Texts</button>
                    </article>
                    {!posts || posts.length <= 0 ? (
                        <article class="noposts">
                            <img src={noposts}/>
                            <p><b>@{userdetails.username}</b> has not uploaded any posts yet. :/</p>
                        </article>
                    ) : (
                        <article class="imgposts">
                            {posts.map(post => (
                                <img src={post.img}/>
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