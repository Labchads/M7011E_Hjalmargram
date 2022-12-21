import React, { Component } from "react";
import './pages/css/main.css';

class Header extends Component {
  render() {
    return (
        <nav class ="Top">
            <h2>Hjalmargram</h2>
            <a href="#">Search</a>
            <a href="#">Notifications</a>
            <a href="#">Menu</a>
        </nav>
    );
  }
}

export default Header;