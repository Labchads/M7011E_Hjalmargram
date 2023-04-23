import {React, useContext} from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";
import Home from "./components/pages/Home";
import jwt_decode from "jwt-decode";
import AdminPage from "./components/pages/AdminPage";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import CreateAccount from "./components/pages/CreateAccount";
import MakePost from "./components/pages/MakePost";
import PostView from "./components/pages/PostView";
import NotFound from "./components/NotFound";
import Profile from "./components/pages/Profile";
import Settings from "./components/pages/Settings";
import Followers from "./components/pages/Followers";
import Following from "./components/pages/Following";
import DirectMessages from "./components/pages/dms";
import Dropdown from "./components/dropdown";
import ResetPass from "./components/ResetPass";

function App() 
{
  let isLogged = false;
  let user = localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")) : null;
  
  return (
    <BrowserRouter>
      {user != null ? isLogged = true : false}
      <div>
        <nav className="Top">
          <h2><Link to="/">Hjalmargram</Link></h2>
          {user != null ? <Link to={`/profile/${user.username}`}>Profile</Link> : null}
          {isLogged ? <Link to="/dms">Direct Messages</Link> : null}
          {isLogged && user.is_admin ? <a href="http://localhost:8000/admin/">Admin Stuff</a> : null}
          {/* {isLogged && user.is_admin ? <Link to="/admin">Admin Stuff</Link> : null} */}
          {isLogged ? <Link to="/resetpassword">Change Password</Link> : null}
          <div>
            {isLogged ? <Link to="/logout">Log out</Link> : <Dropdown options={["Not logged in", "Login", "Create Account"]} paths={["/", "/login", "/createaccount"]}/>}
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
            <Route path="/post/:postid" element={<PostView />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/resetpassword" element={<ResetPass/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
