import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
        <nav class ="Top">
            <h2 onclick="location='index.html'">Hjalmargram</h2>
            <a href="#">Search</a>
            <a href="#">Notifications</a>
            <a href="#">Menu</a>
        </nav>
    );
  }
}

export default Header;