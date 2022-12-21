import React, { Component } from "react";
import axios from "axios";
import limpowitch from "./pages/pfp/Limpowitch.png";
import skor from "./pages/img/Skor.png";
import jek from "./pages/pfp/Jek9412.png";
import kapsyloffer from "./pages/pfp/Kapsyloffer.png";
import "./pages/css/main.css";
import Comment from "./Comment";

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);

class Post extends Component {
    state = {
        post: [],
        comments: []
    };
    componentDidMount() {
        this.resetState();
    }
    getComments = () => {
        axios.get("http://localhost:8000/api/kapsylgram/post/${state.post[0].id}/comments").then(res => this.setState({ comments: res.data }));
    };
    getPost = () => {
        axios.get("http://localhost:8000/api/kapsylgram/post/${state.post[0].id}").then(res => this.setState({ post: res.data }));
    }
    resetState = () => {
        this.getComments();
        this.getPost();
    };
    render(){
        this.getPost();
        this.getComments();
        const post = this.state.post[0];
        const comments = this.state.comments;
        const postedBy = post.postedBy;
        return(
            <article class="Imgpost">
                <div class="topOfPost">
                    <div>
                        <img src={limpowitch} alt="Limpowitch" class="pfp2"/>
                        <b>{postedBy.dispayname}</b>
                    </div>
                    <div>
                        <span>3h ago</span>
                    </div>
                </div>
                
                <div class="image">
                    <img src={skor} alt = "skor"/>
                </div>
                
                <div class="controls">
                    {/* <button>&lt;3</button> */}
                    <b><a class="tag">@Kapsyloffer</a> and 12 others like this.</b>
                    <b>{post.likes.length} liked this</b>
                </div>
                
                <div class="commentfield">
                    {!comments || comments.length <= 0 ? (
                        <b>Ops, no comments here yet</b>
                        ) : (
                            comments.map(comment => (
                            <tr key={comment.pk}>
                                <Comment
                                    comment_text = {comment.text}
                                    commentBy = {comment.sender.username}
                                />
                            </tr>
                            ))
                        )
                    }
                </div>
		    </article>
        )
    }
}

export default Post;