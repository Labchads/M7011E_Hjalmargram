import React from 'react'
import ReactDOM from 'react-dom'

const h = 
(
    <h2 onclick="location='index.html'">Hjalmargram</h2>
	<a href="#">Search</a>
    <a href="#">Notifications</a>
	<a href="#">Menu</a>
);

let x = document.getElementById("headerz");
ReactDOM.render(h, x);