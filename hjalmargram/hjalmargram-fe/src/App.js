/*import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './main.css';


import Profile from "./components/pages/Profile";
*/

import Header from "./components/Header";
import Post  from "./components/Post"
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";

function App() 
{
 return (
  <div>
  <Header />
  if (s)
      {
        <CreateAccount/>
      }
      if (l)
      {
        <Login/>
      }
      if (n) 
      {
        <Post/>
      }
  </div>
  );
}

export default App;
