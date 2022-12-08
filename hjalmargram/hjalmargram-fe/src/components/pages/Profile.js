import React, { Component } from "react";
import {BrowserRouter as Router} from 'react-router-dom';

class Profile extends React.Component{

    render(){
        return(
                <body>
                    <nav class ="Top">
                        <h2 onclick="location='index.html'">Hjalmargram</h2>
                        <a href="#">Search</a>
                        <a href="#">Notifications</a>
                        <a href="#">Menu</a>
                    </nav>
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
                                <p><a href="#">@LeifTeorin:</a> Var det verkligen 6 mille?</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: center;">
                                    <b><a href="#">Likes: 2</a></b><b><a href="#">Comments: 329</a></b>
                                </div>
                        </div>
                        <br/>
                        <div class="textpost" onclick="location='textpost.html'">
                                <p><a href="#">@LeifTeorin:</a> Idk about you guys men jag kom på en great lösning till flyktingfrågan.</p>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: center;">
                                    <b><a href="#">Likes: 1</a></b><b><a href="#">Comments: 0</a></b>
                                </div>
                        </div>
                        <br/>
                        <div class="textpost" onclick="location='textpost.html'">
                            <p><a href="#">@LeifTeorin:</a> Min källa är att jag hittade fan på det.</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: center;">
                                <b><a href="#">Likes: 46</a></b><b><a href="#">Comments: 8</a></b>
                            </div>
                        </div>
                        <br/>
                        <div class="textpost" onclick="location='textpost.html'">
                            <p><a href="#">@LeifTeorin:</a> Klimatkris? More like dött ris lmao.</p>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; text-align: center;">
                                <b><a href="#">Likes: 5</a></b><b><a href="#">Comments: 1</a></b>
                            </div>
                        </div>
                        <br/>
                    </article>

                    <article class="noposts">
                        <img src="img/noposts.gif"/>
                        <p><b>@LeifTeorin</b> has not uploaded any posts yet. :/</p>
                    </article>
                </body>
        )
    }
}

export default Profile;