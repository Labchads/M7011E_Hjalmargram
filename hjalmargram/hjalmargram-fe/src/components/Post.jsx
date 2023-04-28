import React, { Component} from "react";
import { Link } from 'react-router-dom';
import "./pages/css/main.css";
import Comment from "./Comment";
import leifteorin from "./pages/pfp/LeifTeorin.png";
import CommentField from "./CommentField";

class Post extends Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            isHidden: false,
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState((prevState) => ({ isHidden: !prevState.isHidden }));
      }


    render() 
    {
        const post = this.props.post;
        const { isHidden } = this.state;
        return(
            <article class="ImgPost">
                <div class="topOfPost">
                    <div class="poster">
                <button onClick={this.handleToggle}>
                    {isHidden ? "▶" : "▼"}
                    </button>
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
                <div class="image" style={isHidden ? {display: "none"} : {}}>
                    <img src={post.picture} alt="imgpost"/>
                </div> 
                : null}
                <br/>
                <div class="controls" style={isHidden ? {display: "none"} : {}}>
                    <button>❤</button>
                    <b>&nbsp;&nbsp; {post.likes.length} users like this.</b>
                </div>
                <br/>
                <div class="commentfield" style={isHidden ? {display: "none"} : {}}>
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
                    <CommentField comment_on={post.pk}/>
                </div>
            </article>
        );
    }
}

export default Post;
