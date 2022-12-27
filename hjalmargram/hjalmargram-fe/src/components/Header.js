import React, { Component } from "react";
import './pages/css/main.css';
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Comment from "./components/Comment";
import axios from 'axios';
import Post  from "./components/Post";

console.log("ass2");
class Header extends Component {
  render() {
    return (
        <nav class ="Top">
            <h2>Hjalmargram</h2>
              <button onClick={(e) => this.navbar(search)}>Search</button>
              <button onClick={(e) => this.navbar(nots)}>Notifications</button>
              <button onClick={(e) => this.navbar(login)}>Login</button>
        </nav>
    );
  }
  navbar(click)
  {
      switch(click)
      {
        case search:
          console.log("ass");
          return <Profile/>;
        case nots:
          console.log("ass");
          return <Post/>;
        case login:
          console.log("ass");
          return <Login/>;
        default:
          //todo
          break;
      }
  };


}

export default Header;