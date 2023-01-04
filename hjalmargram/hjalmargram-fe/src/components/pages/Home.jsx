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

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);
console.log(leifteorin);

class Home extends Component {

    state = {
        user: getUserProfile(),
        posts: [],
        m: false
    }
    
    makepostpage = e => {
        this.setState({m: !this.state.m})
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
                            <article class="imgposts">
                                <div class="topOfPost">
                                    <div>
                                        <img src={post.postedBy.pfp} class="pfp2"/>
                                        <b>{post.postedBy.username}</b>
                                    </div>
                                    {console.log(post)}
                                    <div>
                                        <span>3h ago</span>
                                    </div>
                                </div>
                                <hr/>
                                {post.picture != null ?
                                <div class="image">
                                    <img src={post.picture}/>
                                </div> 
                                : null}
                                <hr/>
                                <div class="controls">
                                    <button>{post.likes.length}</button>
                                    <b> {post.likes.length} like this.</b>
                                </div>
                                <hr/>
                                <div class="commentfield">
                                    <Comment
                                        comment_text = {post.content}
                                        commentBy = {post.postedBy.username}
                                        pic = {post.postedBy.pfp!=null ? post.postedBy.pfp: leifteorin}
                                    />
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