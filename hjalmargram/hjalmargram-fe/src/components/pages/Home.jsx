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
        //console.log(this.context);
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
                        post => (
                            <article class="ImgPost">
                                <div class="topOfPost">
                                    <div class="poster">
                                    <b class="Post_Disp"> {post.postedBy.pfp != null ?
                                            <img src={post.postedBy.pfp} class="pfp" alt="poser"/>
                                        :   <img src={leifteorin} class="pfp" alt="Hjalle idk"/>
                                        }
                                        &nbsp;
                                            <Link to={`/profile/${post.postedBy.username}`}>{post.postedBy.displayname}</Link>&nbsp;
                                            <br/>
                                            <i class="Post_Tag">@{post.postedBy.username}</i>
                                        </b>
                                    </div>

                                    <div class="spanTime">
                                        <span>{post.postedWhen.toString().split("T")[0]}{/* 2h ago */ /*TODO: Funktion som kollar datum, och om det postades idag, x hours ago, igår, yesterday, annars visa bara datum.*/ }</span>
                                    </div>
                                </div>
                                <br/>
                                {post.picture != null ?
                                <div class="image">
                                    <img src={post.picture} alt="imgpost"/>
                                </div> 
                                : null}
                                <br/>
                                <div class="controls">
                                    {/*Todo: toggla like, 
                                    om du laddar om sidan och 
                                    redan har likeat ska det synas.*/}
                                    <button onClick={(e) => this.likePost(post, e)}>❤</button>
                                    <b>&nbsp;&nbsp; {post.likes.length} users like this.</b>{this.context.user != null && post.likes.includes(this.context.user.user_id) ? <b>including you</b> : null}
                                </div>
                                <br/>
                                <div class="commentfield">
                                    <h2>Comments:</h2>
                                    <Comment
                                        comment_text = {post.content}
                                        commentBy = {post.postedBy.username}
                                        pic = {post.postedBy.pfp!=null ? post.postedBy.pfp: leifteorin}
                                    />
                                    {post.comments.length > 0 ? (
                                        <>
                                            {post.comments.map(comment => (
                                                <Comment 
                                                comment_text = {comment.text}
                                                commentBy = {comment.sender.username}
                                                pic = {comment.sender.pfp!=null ? comment.sender.pfp: leifteorin}
                                                />
                                            )
                                            )}
                                        </>
                                    ) : null}
                                    {//TODO: FIX
                                    }
                                    <span>Plese view <Link to={`/post/${post.pk}`}>THIS POST </Link> to comment</span>
                                </div>
                            </article>
                            
                        )
                    )}
                    <article>
                        <button onClick={this.loadMore}>Load More</button>
                    </article>
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

export default Home;