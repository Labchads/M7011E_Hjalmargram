import React, { Component} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import AuthContext from "../context/AuthContext";
import "./pages/css/main.css";
import Comment from "./Comment";
import leifteorin from "./pages/pfp/LeifTeorin.png";

class Post extends Component 
{
  render() 
  {
    const post = this.props.post;
    return(
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
                <span>{post.postedWhen}{/* 2h ago */}</span>
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
            <span>Plese view <Link to={`/post/${post.pk}`}>THIS POST </Link> to comment</span>
        </div>
    </article>
    );
  }
}

export default Post;
