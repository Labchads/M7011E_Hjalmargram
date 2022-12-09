import React, { Component, Fragment } from "react";
import logo from './logo.svg';
import './main.css';
import Header from "./components/Header";
import UserList from "./components/UserList";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Comment from "./components/Comment";
import axios from 'axios';

function App() {
  return (
    <html>
      <Header/>
      <Comment/>
	  </html>
  );
}

export default App;
