import React, { Component } from "react";
import limpowitch from "./pfp/Limpowitch.png";
import skor from "./img/Skor.png";
import jek from "./pfp/Jek9412.png";
import kapsyloffer from "./pfp/Kapsyloffer.png";
import leifteorin from "./pfp/LeifTeorin.png";
import Comment from "./../Comment";

console.log(limpowitch);
console.log(skor);
console.log(jek);
console.log(kapsyloffer);
console.log(leifteorin);

class Home extends Component {

    render(){
        return(
            <div>
                <article class ="makePostButton">
                    <button>Make post</button>
                </article>
                <article class="Imgpost">
                    <div class="topOfPost">
                        <div>
                            <img src={limpowitch} class="pfp2"/>
                            <b>Limpowitch</b>
                        </div>
                        <div>
                            <span>3h ago</span>
                        </div>
                    </div>
                    <div class="image">
                        <img src={skor} onclick="location = 'imgpost.html'"/>
                    </div>
                    <div class="controls">
                        <button>3</button>
                        <b><a class="tag" href="profile.html">@Kapsyloffer</a> and 12 others like this.</b>
                    </div>
                    <hr/>
                    <div class="commentfield">
                        <Comment
                            comment_text = "lmao who did this?"
                            commentBy = "Limpowitch"
                        />
                        <Comment
                            comment_text = "Not me bro. It's Kapsyloffer"
                            commentBy = "Jek9412"
                        />
                        <Comment
                            comment_text = "Nah bro I went home early frfr"
                            commentBy = "Kapsyloffer"
                        />
                    </div>
                </article>
                <article class="Textpost">
                    <div class="topOfPost">
                        <div class="topLeft">
                            <img src={kapsyloffer} class="pfp2"/>
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
                            <img src={jek} class="pfp"/>
                            <p><b><a href="profile.html" class="commenter">@Jek9412</a>:</b>: lmao</p>
                        </div>
                    </div>
                </article>
            </div>
        )
    }
}

export default Home;