import React, { Component, Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './main.css';
import Header from "./components/Header";
import UserList from "./components/UserList";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Comment from "./components/Comment";
import axios from 'axios';
import Post  from "./components/Post";
import CreateAccount from "./components/pages/CreateAccount";

function App() {
  return (
    <>
      <Header/>
      {/* <Link to="/about">About</Link> */}
      <CreateAccount/>
      
      {/* <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch> */}
	  </>
  );
}

export default App;
