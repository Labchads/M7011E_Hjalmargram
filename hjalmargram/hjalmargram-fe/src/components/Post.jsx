import axios from "axios";
import { useLocation } from "react-router-dom";

import "./pages/css/main.css";

const Post = (props) => 
{
  var params = useLocation().pathname.split("/");
  let postID = params[2];
  //TODO: 
  //Use axios och fetcha post
  //Om den finns, render, om inte, 404
  //???
  //Prodit
}  

export default Post;