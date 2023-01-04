import React, { Component, Fragment, useState } from "react";
import { checkLoggedIn, useUser } from "./actions/auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import { checkAuthenticated } from "./actions/auth";
import { logout } from "./actions/auth";
import {connect} from 'react-redux';
import Home from "./components/pages/Home";
import Post  from "./components/Post";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import MakePost from './components/pages/MakePost';
import { AuthProvider } from "./context/AuthContext";

function App() 
{
  const [s, setS] = useState(false);
  const [n, setN] = useState(false);
  const [l, setL] = useState(false);

  function navbar(click)
  {
    console.log(click);
    var a = React.createElement("div", {}, React.createElement("h1", {}, "Disco disco party party"));
    setS(false);
    setN(false);
    setL(false);
      switch(click)
      {
        case 'search':
        console.log('ass - search');
        setS(true);
        break;
      case 'nots':
        console.log('ass - nots');
        setN(true);
        break;
      case 'login':
        console.log('ass - login');
        setL(true);
        break;
      default:
        break;
      }
    };
    
 return (
  <div>
    <nav className ="Top">
        <h2 onClick = {(e) => navbar(null)}>Hjalmargram</h2>
        <button onClick = {(e) => navbar("search")}>Profile</button>
        <button onClick = {(e) => navbar("nots")}>Post</button>
        <button onClick = {(e) => navbar("login")}>Login</button>
        
    </nav>
    
    {!s && !n && !l ? <Home /> : null}
    {s ? <Profile/> : null}
    {n ? <CreateAccount /> : null}
    {l ? <Login /> : null}
  </div>
  );
}


export default App;
