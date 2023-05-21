import React, { Component } from "react";
import {Link} from "react-router-dom";
import './css/profile.css'
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import noposts from './img/noposts.gif';
import challe from './pfp/LeifTeorin.png';
import AuthContext from "../../context/AuthContext";

//let view = 0;

class Profile extends Component{
    username = window.location.pathname.split("/")[2];
    static contextType = AuthContext;
    state = {
        user: this.context.user,
        user_id: 0,
        userdetails: [],
        posts: [],
        followercount: 0,
        followingcount: 0,
        isFollowing : false,
        isMe : false,
    }


    getUser = async () => {
        return await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`).then(res => {
            if(this.state.userdetails.pk < 1)
            {
                return;
            }
            this.state.userdetails = res.data[0];
            console.log("userdeets: ", this.state.userdetails); 
            this.setState({ user_id: this.state.userdetails.pk});
            console.log("user_id:",  this.state.userdetails.pk );
        });
    };

    getFollowers = async () => {
        return await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/followers`).then(res => {
            this.setState({followercount: res.data.length});
        });
    }
    
    getFollowing = async () => {
        return await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/following`).then(res => {
            let following = res.data[0];
            this.setState({followingcount: following.another_user.length});
        });
    }

    getPosts = async () => {
        return await axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}/posts`).then(res => {
            //this.userdetails = res.data[0];
            this.setState({ posts: res.data});
            //console.log(this.state.userdetails);
        });
    };

    amIFollowing = async () =>
    {
        return await axios.get(`http://localhost:8000/api/kapsylgram/profile/${this.state.user_id}/followers`).then(res => {
            this.setState({isFollowing: false}); //soft reset
            res.data.forEach(element => {
            if(parseInt(element.pk) == parseInt(this.context.user.user_id))
            {
                this.setState({isFollowing: true});
            }
            });
        });
    }

    isThisMe = async() =>
    {
        if(this.context.user.user_id == this.state.user_id)
        {
            this.setState({isMe: true});
        }
        else
        {
            this.setState({isMe: false});
        }
    }

    resetState = () => {
        this.getUser();
        this.getPosts();
        this.getFollowers();
        this.getFollowing();
        this.amIFollowing();
        this.isThisMe();
    };

    toggleFollow = async () => {
        let formData = new FormData();
        console.log("fd:", this.context.user.user_id);
        console.log("id: ", this.state.user_id);
        formData.append('username', this.state.user.username);
        await axios.post(`http://localhost:8000/api/kapsylgram/follow/${this.state.user_id}`, formData, {
            headers: {
              'content-type': 'multipart/form-data',
              'Authorization':'Bearer ' + String(this.context.authTokens.access)
            }
        }).then(res => {
            if(this.state.isFollowing)
            {
                this.setState({isFollowing: false});
            }
            else
            {
                this.setState({isFollowing: true});
            } //ugly hack
            this.resetState();
            return <h1>{res.data['success']}</h1>
        })
        .catch(err => {
            console.log(err);
        });
    }
    async componentDidMount() 
    {
        let res;
        res = await this.getUser();
        res = await this.getPosts();
        res = await this.getFollowers();
        res = await this.getFollowing();
        res = await this.amIFollowing();
        res = await this.isThisMe();
    }

    render(){
        const {isFollowing} = this.state;
        const {isMe} = this.state;
        const userdetails = this.state.userdetails;
        const posts = this.state.posts;
        return(
            <div>
                <article class = "profilepic">
                    {userdetails.pfp != null ? <img src={userdetails.pfp} alt="#"/> : <img src={challe} alt="#"/>}
                    <h2>{userdetails.displayname}</h2>
                    <b>@{userdetails.username}</b>
                    <br/>
                    <div class = "profileinfo">
                        <b>Posts:<br/>{posts.length}</b><Link to="./Followers"><b>Followers:</b><br/>{this.state.followercount}</Link><Link to="./Following"><b>Following:</b><br/>{this.state.followingcount}</Link>
                    </div>
                    <br/>
                    <div class="followbuttons">
                    {isMe ? (
                        <p>This is you</p>
                        ) : (
                        isFollowing ? (
                            <button onClick={this.toggleFollow}>Unfollow</button>
                        ) : (
                            <button onClick={this.toggleFollow}>Follow</button>
                        )
                        )}
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
                            <div class="image" key={post.pk}>
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