import React, { Component } from "react";
import {BrowserRouter as Router} from 'react-router-dom';


class Home extends React.Component {

    render(){
        return(
            <body>
                <nav class ="Top">
                    <h2 onclick="location='index.html'">Hjalmargram</h2>
                    <a href="#">Search</a>
                    <a href="#">Notifications</a>
                    <a href="#">Menu</a>
                </nav>
                <article class ="makePostButton">
                    <button>Make post</button>
                </article>
                <article class="Imgpost">
                    <div class="topOfPost">
                        <div>
                            <img src="pfp/Limpowitch.png" class="pfp" style="height: 2em; width: 2em;"/>
                            <b>Limpowitch</b>
                        </div>
                        <div>
                            <span>3h ago</span>
                        </div>
                    </div>
                    <div class="image">
                        <img src="img/Skor.png" onclick="location = 'imgpost.html'"/>
                    </div>
                    <div class="controls">
                        <button>&lt;3</button>
                        <b><a class="tag" href="profile.html">@Kapsyloffer</a> and 12 others like this.</b>
                    </div>
                    <hr/>
                    <div class="commentfield">
                        <div class ="comment">
                            <p><b><a href="profile.html" class="commenter">@Limpowitch</a>:</b>: Who did this lmao</p>
                        </div>
                        <div class ="comment">
                            <img src="pfp/Jek9412.png" class="pfp"/>
                            <p><b><a href="profile.html" class="commenter">@Jek9412</a>:</b>: Not me bro. It's <a class="tag" href="#">@Kapsyloffer</a></p>
                        </div>
                        <div class ="comment">
                            <img src="pfp/Kapsyloffer.png" class="pfp"/>
                            <p><b><a href="profile.html" class="commenter">@Kapsyloffer</a>:</b>: Nah bro I went home early frfr</p>
                        </div>
                    </div>
                </article>
                <article class="Textpost">
                    <div class="topOfPost">
                        <div class="topLeft">
                            <img src="pfp/Kapsyloffer.png" class="pfp" style="height: 2em; width: 2em;"/>
                            <b>Kapsyloffer</b>
                        </div>
                        <div class="topRight">
                            <span>4h ago</span>
                        </div>
                    </div>
                    <hr/>
                    <div class="text" onclick="location = 'textpost.html'">
                        <p>Professorn sa pp pa lektionen lmao</p>
                    </div>
                    <hr/>
                    <div class="controls">
                        <button>&lt;3</button>
                        <b><a class="tag" href="profile.html">@LeifTeorin</a> and 3 others like this.</b>
                    </div>
                    <hr/>
                    <div class="commentfield">
                        <div class ="comment">
                            <img src="pfp/Jek9412.png" class="pfp"/>
                            <p><b><a href="profile.html" class="commenter">@Jek9412</a>:</b>: lmao</p>
                        </div>
                    </div>
                </article>
            </body>
        )
    }
}

export default Home;