import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./pages/css/main.css";
import PostID from "./postID";

console.log(PostID);

class Post extends Component
{
  render()
  {
    return(
      <article>
        <h2>Post ID: <br/><PostID/></h2>
      </article>
    )
  }
}


export default Post;