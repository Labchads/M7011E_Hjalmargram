import React, { Component } from "react";


class Profile extends Component{

    render(){
        return(
                <div>
                    <article class = "profilepic">
                        <img src="pfp/LeifTeorin.png"/>
                        <h2>Challe</h2>
                        <b>@LeifTeorin</b>
                        <br/>
                        <div style = "display: grid; grid-template-columns: 1fr 1fr 1fr;">
                            <b>Posts:<br/>23</b><a href="#"><b>Followers:</b><br/>69</a><a href="#"><b>Following:</b><br/>420</a>
                        </div>
                        <br/>
                        <div style="width: 50%; display:grid; grid-template-columns: 9fr 1fr;" class="followbuttons">
                            <button onclick="location='https://youtu.be/O_IYLqIjtMg?t=17'">Follow</button>
                            <button> DM </button>
                        </div>
                        <br/>
                        <p class="bio"><b>"</b>Live laugh love.<b>"</b></p>
                    </article>
                    <article class="buttons">
                        <button>Images</button>
                        <button>Videos</button>
                        <button>Texts</button>
                    </article>
                    <article class="imgposts">
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/Jek9412.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                        <div class="image">
                            <img src="pfp/LeifTeorin.png" onclick="location='imgpost.html'"/>
                        </div>
                    </article>
                    <article class="textposts">
                        <div class="textpost" onclick="location='textpost.html'">
                            <p><a href="#">@LeifTeorin:</a> Min källa är att jag hittade fan på det.</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: center;">
                                <b><a href="#">Likes: 46</a></b><b><a href="#">Comments: 8</a></b>
                            </div>
                        </div>
                        <br/>
                    </article>
                    <article class="noposts">
                        <img src="img/noposts.gif"/>
                        <p><b>@LeifTeorin</b> has not uploaded any posts yet. :/</p>
                    </article>
                </div>
        )
    }
}

export default Profile;