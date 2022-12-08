import React, { Component, Fragment } from "react";
import logo from './logo.svg';
import './main.css';
import Header from "./components/Header";
import UserList from "./components/UserList";
import axios from 'axios';

function App() {
  return (
    <body>
      <Header/>
      <UserList/>
	  </body>
  );
}

export default App;
