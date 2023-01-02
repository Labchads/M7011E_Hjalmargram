import React from "react";
import { BrowserRouter as Route, Link, Switch} from "react-router-dom";
import './main.css';
import Home from "./components/pages/Home";
import Post  from "./components/Post";
import Profile from "./components/pages/Profile";
import Login from "./components/pages/Login";
import CreateAccount from "./components/pages/CreateAccount";
import Layout from "./hocs/Layout";

function App() {
  return (
    <div>
        <nav className="Top">
          <h2>
            <Link to='/'>Hjalmargram</Link>
          </h2>
          <Link to='/profile'>Profile</Link>
          <Link to='/createaccount'>Create Account</Link>
          <Link to='/post'>Post</Link>
          <Link to='/login'>Login</Link>
        </nav>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/login' component={Login}/>
          <Route path='/post' component={Post}/>
          <Route path='/createaccount' component={CreateAccount}/>        
        </Switch>
        
    </div>
  );
}

export default App;
