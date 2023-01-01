import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './main.css';

import Home from "./components/pages/Home";
import Post  from "./components/Post";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";

function App() {
  return (
    <div>
        <Router>
          
          <nav class="Top">
            <h2>
              <Link to="/">Hjalmargram</Link>
            </h2>
            <Link to="/profile">Profile</Link>
            <Link to="/createAccount">Create Account</Link>
            <Link to="/post">Post</Link>
            <Link to="/login">Login</Link>
          </nav>
          <Routes>
            
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/profile">
              <Profile user="LeifTeorin" nick="ChalleChad" followers="69" following="1337" />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path = "/post">
              <Post />
            </Route>

            <Route path = "/createAccount">
              <CreateAccount />
            </Route>

          </Routes>
        </Router>
    </div>
  );
}

export default App;
