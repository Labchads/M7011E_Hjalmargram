import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import MakePost from "./components/pages/MakePost";
import Post from "./components/Post";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="Top">
          <h2><Link to="/">Hjalmargram</Link></h2>
          <Link to="/profile">Profile</Link>
          <Link to="/post">Post</Link>
          <Link to="/login">Login</Link>
        </nav>
      <Routes>
        <Route path="/profile" element={<Profile/>} />
        <Route path="/post" element={<Post />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/makepost" element={<MakePost />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Home/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
