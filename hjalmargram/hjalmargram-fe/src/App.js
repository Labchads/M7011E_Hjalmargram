import React, { Component, Fragment, useState } from "react";
/*import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './main.css';


import Profile from "./components/pages/Profile";
*/

import Post  from "./components/Post"
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";


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
    <nav class ="Top">
        <h2>Hjalmargram</h2>
        <button onClick={(e) => navbar("search")}>Profile</button>
        <button onClick={(e) => navbar("nots")}>Post</button>
        <button onClick={(e) => navbar("login")}>Login</button>
    </nav>
    {s ? <CreateAccount /> : null}
    {n ? <Login /> : null}
    {l ? <Post /> : null}
    <h2>Made it here</h2>
  </div>
  );
}


export default App;
