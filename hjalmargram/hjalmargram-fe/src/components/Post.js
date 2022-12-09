import React, { Component } from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import limpowitch from "./pages/pfp/Limpowitch.png";
import skor from "./pages/img/Skor.png";
import jek from "./pages/pfp/Jek9412.png";
import kapsyloffer from "./pages/pfp/Kapsyloffer.png";
import "./pages/css/main.css";

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);

class Post extends Component {

    render(){
        return(
            <article class="Imgpost">
                <div class="topOfPost">
                    <div>
                        <img src={limpowitch} alt="Limpowitch" class="pfp" style="height: 2em; width: 2em;"/>
                        <b>Limpowitch</b>
                    </div>
                    <div>
                        <span>3h ago</span>
                    </div>
                </div>
                <hr/>
                <div class="image">
                    <img src={skor}/>
                </div>
                <hr/>
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
                        <img src={jek} class="pfp"/>
                        <p><b><a href="profile.html" class="commenter">@Jek9412</a>:</b>: Not me bro. It's <a class="tag" href="#">@Kapsyloffer</a></p>
                    </div>
                    <div class ="comment">
                        <img src={kapsyloffer} class="pfp"/>
                        <p><b><a href="profile.html" class="commenter">@Kapsyloffer</a>:</b>: Nah bro I went home early frfr</p>
                    </div>
                </div>
		    </article>
        )
    }
}

export default Post;