import {React, useContext} from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import Home from "./components/pages/Home";
import jwt_decode from "jwt-decode";

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
  let user = localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null;
  if (user != null) {
    isLogged = true;
  }
  return (
    <BrowserRouter>
      <div>
        <nav className="Top">
          <h2><Link to="/">Hjalmargram</Link></h2>
          {isLogged ? <Link to='/profile/me'>Profile</Link> : null}
          {isLogged ? <Link to="/dms">Direct Messages</Link> : null}
          <div>
          {isLogged ? <Link to="/logout">Log out</Link> : <Link to="/login">Login</Link>}
          </div>
        </nav>
      <AuthProvider>
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
      </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
