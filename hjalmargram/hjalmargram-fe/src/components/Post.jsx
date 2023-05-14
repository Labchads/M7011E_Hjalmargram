import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./pages/css/main.css";
import Comment from "./Comment";
import leifteorin from "./pages/pfp/LeifTeorin.png";
import CommentField from "./CommentField";
import AuthContext from "../context/AuthContext";
import axios from 'axios';

class Post extends Component {
  static contextType = AuthContext;
  
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
      isLiked: false,
      hasLikeSinceEarlier: false, //ugly hack
    };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState((prevState) => ({ isHidden: !prevState.isHidden }));
  }

  likePost = e => {
    let res = axios.post(`http://localhost:8000/api/kapsylgram/post/${e.pk}/like`, {'username': this.context.user.username}, {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization':'Bearer ' + String(this.context.authTokens.access)
      }
    }).then(res => {
      if (this.state.isLiked) {
        this.setState({ isLiked: false });
      } else {
        this.setState({ isLiked: true });
      }
      console.log(this.state.isLiked)
    });
  }

  async componentDidMount() 
    {
        if (this.context.user != null && this.props.post.likes.includes(this.context.user.user_id))
        {
            this.setState({isLiked: true});
            this.setState({hasLikeSinceEarlier: true})
        }
    }

  render() {
    const post = this.props.post;
    const { isHidden } = this.state;
    const { isLiked } = this.state;
    const count_reduction = this.state.hasLikeSinceEarlier ? 1 : 0;
    const date = new Date(post.postedWhen).toLocaleString();
    const likeText = isLiked ? `You and ${post.likes.length - count_reduction} other people like this` :
        `${post.likes.length - count_reduction} people like this`;
    return (
      <article class="ImgPost">
        <div class="topOfPost">
          <div class="poster">
            <button onClick={this.handleToggle}>
              {isHidden ? "▶" : "▼"}
            </button>
            {post.postedBy.pfp != null ?
              <img src={post.postedBy.pfp} class="pfp" alt="poser" />
              : <img src={leifteorin} class="pfp" alt="Hjalle idk" />
            }
            <b>&nbsp;<Link to={`/profile/${post.postedBy.username}`}>@{post.postedBy.username}</Link></b>
          </div>

                    <div class="spanTime">
                        <span>{date}</span>
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

                {isLiked? //this.context.user != null && post.likes.includes(this.context.user.user_id)
                <button class="Liked" onClick={(e) => this.likePost(post, e)}>❤</button> : 
                <button onClick={(e) => this.likePost(post, e)}>❤</button>}

                <b>&nbsp;&nbsp; {likeText}</b>


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
