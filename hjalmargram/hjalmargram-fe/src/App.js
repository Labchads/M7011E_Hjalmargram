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

import { s, n, l} from "./components/Header";
const bools = [s, n, l];
function App() 
{
 return (
  <div>
    <Header />
    {bools[0] ? <CreateAccount /> : null}
    {bools[1] ? <Login /> : null}
    {bools[2] ? <Post /> : null}
    <h2>Made it here</h2>
  </div>
  );
}

export default App;
