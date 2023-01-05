import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import CreateAccount from "./components/pages/CreateAccount";
import MakePost from "./components/pages/MakePost";
import Post from "./components/Post";
import NotFound from "./components/NotFound";

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
          <Link to="/profile">Profile</Link>
          <Link to="/post">Post</Link>
          {isLogged ? <Link to="/logout">Log out</Link> : <Link to="/login">Login</Link>}
        </nav>
      <Routes>
        <Route exact path="/" element={<Home/>} />

        <Route path="/profile/:u_name" element={<Profile/>} />
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
