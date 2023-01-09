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

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);
console.log(leifteorin);

    let isLogged = false;
  const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (jwt.length > 4) 
    {
      isLogged = true;
    }

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

    loadMore = async e => {
        let currposts = this.state.posts;
        let res = axios.post(`http://localhost:8000/api/kapsylgram/`, {'last_post': currposts.length}).then(res => {
            let newposts = res.data;
            this.setState({ posts: currposts.concat(newposts) });
        });
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
                            <article class="ImgPost">
                                <div class="topOfPost">
                                    <div class="poster">
                                        {post.postedBy.pfp != null ?
                                            <img src={post.postedBy.pfp} class="pfp" alt="poser"/>
                                        :   <img src={leifteorin} class="pfp" alt="Hjalle idk"/>
                                        }
                                        <b>&nbsp;<Link to={`/profile/${post.postedBy.username}`}>@{post.postedBy.username}</Link></b>
                                    </div>

                                    <div class="spanTime">
                                        <span>{/*post.postedWhen*/} 2h ago</span>
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
                                    <button>❤</button>
                                    <b>&nbsp;&nbsp; {post.likes.length} users like this.</b>
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
                                    <span>Plese view <Link to={`/post/${post.id}`}>THIS POST </Link> to comment</span>
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