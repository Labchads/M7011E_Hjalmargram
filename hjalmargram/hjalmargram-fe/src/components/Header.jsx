import React, { Component } from "react";
import './pages/css/main.css';

export let s = false;
export let n = false;
export let l = false;
class Header extends Component 
{
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
    s = false;
    n = false;
    l = false;
      switch(click)
      {
        case "search":
          console.log("ass - search");
          s = !s;
          break;
        case "nots":
          console.log("ass - nots");
          n = !n;
          break;
        case "login":
          console.log("ass - login");
          l = !l;
          break;
        default:
        break;
      }
  };
}

export default Header;