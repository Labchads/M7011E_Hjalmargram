import React, { Component } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./pages/css/main.css";

var postID = window.location.pathname.split("/")[2];
class Post extends Component
{
  render()
  {
    return(
      <article>
        <h2>Post ID: <br/>{postID}</h2>
      </article>
    )
  }
}


export default Post;