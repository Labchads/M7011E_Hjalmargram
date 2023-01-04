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
import MakePost from "./MakePost";
import './css/main.css';

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);
console.log(leifteorin);

class Home extends Component {

    state = {
        user: getUserProfile(),
        posts: [],
        m: false,
        time: Date.now()
    }
    
    makepostpage = e => {
        this.setState({m: !this.state.m})
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 5);
        console.log('now');
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    res = axios.get(`http://localhost:8000/api/kapsylgram/`).then(res => {
        this.setState({ posts: res.data });
    });

    render(){
        const posts = this.state.posts;
        return(
            <div>
                <article class ="makePostButton">
                    <button onClick={this.makepostpage}>Make post</button>
                </article>
                {this.state.m ? <MakePost/> : null}
                {!posts || posts.length <= 0 ? ( 
                    <article class="noposts">
                        <img src={noposts}/>
                        <p>Noone has uploaded any posts yet. :/</p>
                    </article>
                ) : (
                <div>
                    {posts.map(
                        post => (
                            <article class="ImgPost">
                                <div class="topOfPost">
                                    <div class="poster">
                                        {post.postedBy.pfp != null ?
                                            <img src={post.postedBy.pfp} class="pfp"/>
                                        :   <img src={leifteorin} class="pfp"/>
                                        }
                                        <b>&nbsp;<a href={post.postedBy.username}>@{post.postedBy.username}</a></b>
                                    </div>

                                    <div>
                                        <span>{post.postedWhen}</span>
                                    </div>
                                </div>
                                <br/>
                                {post.picture != null ?
                                <div class="image">
                                    <img src={post.picture}/>
                                </div> 
                                : null}
                                <br/>
                                <div class="controls">
                                    <button>{post.likes.length}</button>
                                    <b> {post.likes.length} like this.</b>
                                </div>
                                <br/>
                                <div class="commentfield">
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
                                </div>
                            </article>
                            
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

export default Home;