import React, { Component, useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./pages/css/main.css";
import Comment from "./Comment";
import leifteorin from "./pages/pfp/LeifTeorin.png";

var postID = window.location.pathname.split("/")[2];
class Post extends Component
{
  static contextType=AuthContext;
  post = null;
  state = {
    post: [],
    comments: []
  };
//  res = axios.get(`http://localhost:8000/api/kapsylgram/post/${postID}/comments`).then(res => this.state.comments = res.data );
  
  
  getComments = () => {
    axios.get(`http://localhost:8000/api/kapsylgram/post/${postID}/comments`).then(res => this.setState({ comments: res.data }));
  };
  getPost = async() => {
    let res = await axios.get(`http://localhost:8000/api/kapsylgram/post/${postID}`).then(res => this.setState({ post: res.data }));
    console.log('fuckof');
  };

  componentDidMount() {
    this.getPost();
  };

  res2 = axios.get(`http://localhost:8000/api/kapsylgram/post/${postID}`).then(res => this.state.post = res.data);

  render(){
      const post = this.state.post[0];
      console.log(post);
      return(
        <article class="Imgpost">
          <div class="topOfPost">
            <div>
              <img src={post.postedBy.pfp} class="pfp2"/>
              <b>{post.postedBy.dispayname}</b>
            </div>
            <div>
              <span>3h ago</span>
            </div>
          </div>
          <div class="image">
            <img src={post.picture}/>
          </div>        
          <div class="controls">
            <button>❤</button>
            <b>&nbsp;&nbsp; {post.likes.length} users like this.</b>
          </div>    
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
                ))}
              </>
            ) : null}
          </div>
        </article>
      )
  }
  
}


export default Post;