import React, { Component, Fragment } from "react";
import logo from './logo.svg';
import './main.css';
import Header from "./components/Header";

function App() {
  return (
    <body>
      <Header/>
      <article class ="makePostButton">
        <button>Make post</button>
      </article>
      <article class="Imgpost">
			<div class="topOfPost">
				<div>
					<img src="{% static 'kapsylgram/pfp/Limpowitch.png' %}" class="pfp"/>
					<b>Limpowitch</b>
				</div>
				<div>
					<span>3h ago</span>
				</div>
			</div>
			<div class="image">
				<img src="{% static 'kapsylgram/img/Skor.png' %}"/>
			</div>
			<div class="controls">
				<button>&lt;3</button>
				<b><a class="tag" href="#">@Kapsyloffer</a> and 12 others like this.</b>
			</div>
			<div class="commentfield">
				<div class ="comment">
					<img src="{% static 'kapsylgram/pfp/Limpowitch.png' %}" class="pfp"/>
					<p><b><a href="#" class="commenter">@Limpowitch</a>:</b>: Who did this lmao</p>
				</div>
				<div class ="comment">
					<img src="{% static 'kapsylgram/pfp/Jek9412.png' %}" class="pfp"/>
					<p><b><a href="#" class="commenter">@Jek9412</a>:</b>: Not me bro. It's <a class="tag" href="#">@Kapsyloffer</a></p>
				</div>
				<div class ="comment">
					<img src="{% static 'kapsylgram/pfp/Kapsyloffer.png' %}" class="pfp"/>
					<p><b><a href="#" class="commenter">@Kapsyloffer</a>:</b>: Nah bro I went home early frfr</p>
				</div>
			</div>
		</article>

      <article class="Textpost">
        <div class="topOfPost">
          <div class="topLeft">
            <img src="{% static 'kapsylgram/pfp/Kapsyloffer.png' %}" class="pfp"/>
            <b>Kapsyloffer</b>
          </div>
          <div class="topRight">
            <span>4h ago</span>
          </div>
        </div>
          <div class="text">
            <p>Professorn sa pp pa lektionen lmao</p>
          </div>
          <div class="controls">
            <button>&lt;3</button>
            <b><a class="tag" href="#">@LeifTeorin</a> and 3 others like this.</b>
          </div>
          <div class="commentfield">
            <div class ="comment">
              <img src="{% static 'kapsylgram/pfp/Jek9412.png' %}" class="pfp"/>
              <p><b><a href="#" class="commenter">@Jek9412</a>:</b>: lmao</p>
            </div>
          </div>
      </article>
	  </body>
  );
}

export default App;
