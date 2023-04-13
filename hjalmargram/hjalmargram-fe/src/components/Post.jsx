import React, { Component, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./pages/css/main.css";
import Comment from "./Comment";
import leifteorin from "./pages/pfp/LeifTeorin.png";

class Post extends Component
{
  static contextType=AuthContext;
  postID = window.location.pathname.split("/")[2];
  post = null;
  state = {
    post: [],
    comments: []
  };
  
//  res = axios.get(`http://localhost:8000/api/kapsylgram/post/${postID}/comments`).then(res => this.state.comments = res.data );
  
  
  getComments = () => {
    axios.get(`http://localhost:8000/api/kapsylgram/post/${this.postID}/comments`).then(res => this.setState({ comments: res.data }));
  };
  getPost = async() => {
    let res = await axios.get(`http://localhost:8000/api/kapsylgram/post/${this.postID}`).then(res => this.setState({ post: res.data }));
    console.log('fuckof');
  };

  componentDidMount() {
    this.getPost();
  };

  res2 = axios.get(`http://localhost:8000/api/kapsylgram/post/${this.postID}`).then(res => this.state.post = res.data);

  render(){
      const { post } = this.props;
      console.log(this.postID);
      console.log(post);
      return(
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
                {this.context.user != null && post.likes.includes(this.context.user.user_id) ? 
                <button class="Liked" onClick={(e) => this.likePost(post, e)}>❤</button> : 
                <button onClick={(e) => this.likePost(post, e)}>❤</button>}
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
                {/*TODO: FIX*/}
                <span>Plese view <Link to={`/post/${post.pk}`}>THIS POST </Link> to comment</span>
            </div>
        </article>
      )
  }
  
}


export default Post;