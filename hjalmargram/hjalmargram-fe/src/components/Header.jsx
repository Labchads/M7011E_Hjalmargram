import React, { Component } from "react";
import './pages/css/main.css';
import Comment from "./Comment";
import axios from 'axios';

import Profile from "./pages/Profile";
import Post  from "./Post";
import Login from "./pages/Login";

class Header extends Component {
  render() {
    return (
        <nav class ="Top">
            <h2>Hjalmargram</h2>
              <button onClick={(e) => this.navbar("search")}>Profile</button>
              <button onClick={(e) => this.navbar("nots")}>Post</button>
              <button onClick={(e) => this.navbar("login")}>Login</button>
        </nav>
    );
  }
  navbar(click)
  {
    console.log(click);
    var a = React.createElement("div", {}, React.createElement("h1", {}, "Disco disco party party"));
      switch(click)
      {
        case "search":
          console.log("ass - search");
          return <div><h1>search</h1><Profile /></div>;
        case "nots":
          console.log("ass - nots");
          return <div><h1>nots</h1><Post /></div>;
        case "login":
          console.log("ass - login");
          return <div><h1>login</h1><Login /></div>;
        default:
        break;
      }
  };


}

export default Header;