import React, { Component } from "react";
import "./pages/css/main.css";

class Post extends Component {
  
    render() {
      return (
        <div>
          <h1>Post {this.postid}</h1>
          {/* Render the post with the given postid */}
        </div>
      );
    }
  }  

export default Post;