import React, { Component } from "react";
import './css/profile.css'

//TODO:
//Get profile ID
//Profilepic = profile.src_pfp
//Fetch all images as images[], should contain ID, src, likecount, commentcount
//Foreach img in images[] : 
/*
<div class="image">
    <img src="img.src" / onClick = {(e) => imgPost(img.ID)}>
    <span>Likes: img.like_c</span>
    <span>Comments: img.com_c</span>
</div>
*/      //Or something
//Om man klickar på textposts, fetcha alla textposts, samma sak, visa comment count och likes osv
//Kanske typ: 
/*
<div class="textpost">
<p>txt.content</p>
<span>Likes: txt.likes</span> <span>Comments: txt.com</span>
</div>
*/

//TODO: Gör också dessa till components:
/*
 <article class="imgposts">
    ...
</article>
<article class="textposts">
    ...
</article>
<article class="videoposts">
    ...
</article>
<article class="noposts">
    <img src="img/noposts.gif"/>
    <p><b>_USERNAME</b> has not uploaded any posts yet. :/</p>
</article>
*/

class Profile extends Component{
    state = {
        user: [],
        posts: []
    }
    render(){
        return(
                <div>
                    <article class = "profilepic">
                        <img src="./pfp/LeifTeorin.png"/>
                        <h2>{this.props.nick}</h2>
                        <b>@{this.props.user}</b>
                        <br/>
                        <div class = "profileinfo">
                            <b>Posts:<br/>23</b><a href="#"><b>Followers:</b><br/>{this.props.followers}</a><a href="#"><b>Following:</b><br/>{this.props.following}</a>
                        </div>
                        <br/>
                        <div class="followbuttons">
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
                        
                    </article>
                    <article class="textposts">
                        
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