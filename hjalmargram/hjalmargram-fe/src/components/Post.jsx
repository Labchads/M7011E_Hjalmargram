import React, { Component } from "react";
import axios from "axios";
import "./pages/css/main.css";
import Comment from "./Comment";
import { useParams } from "react-router-dom";

class Post extends React.Component {
  
    render() {
    postid = useParams();
    console.log(postid);
      return (
        <div>
          <h1>Post {this.postid}</h1>
          {/* Render the post with the given postid */}
        </div>
      );
    }
  }  

export default Post;