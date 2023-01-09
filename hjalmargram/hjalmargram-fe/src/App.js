import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from "./components/pages/Home";

import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import CreateAccount from "./components/pages/CreateAccount";

import MakePost from "./components/pages/MakePost";
import Post from "./components/Post";

import NotFound from "./components/NotFound";

import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";
import Followers from "./components/pages/Followers";
import Following from "./components/pages/Following";
import DirectMessages from "./components/pages/dms";

function App() 
{
  let isLogged = false;
  const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (jwt.length > 4) 
    {
      isLogged = true;
    }
  return (
    <BrowserRouter>
      <div>
        <nav className="Top">
          <h2><Link to="/">Hjalmargram</Link></h2>
          <Link to="/profile/me">Profile</Link>
          <Link to="/dms">Direct Messages</Link>
          <div>
          {isLogged ? <Link to="/logout">Log out</Link> : <Link to="/login">Login</Link>}
          </div>
        </nav>
      <Routes>
        <Route exact path="/" element={<Home/>} />

        <Route path="/settings/" element={<Settings />} />
        <Route path="/profile/:u_name" element={<Profile/>} />
          <Route path="/profile/:u_name/followers" element={<Followers/>} />
          <Route path="/profile/:u_name/following" element={<Following/>} />
        
        <Route path="/dms/" element={<DirectMessages/>} />
        <Route path="/makepost" element={<MakePost />} />
        <Route path="/post/:postid" element={<Post />}/>

        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/createaccount" element={<CreateAccount />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
