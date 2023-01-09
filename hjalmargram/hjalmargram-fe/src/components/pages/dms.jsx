import React, { Component } from "react";
import './css/DirectMessages.css'
import Chat from "./Chat";
import Contact from "./Contact";
//Placeholder profilepic
import def_pfp from "./pfp/Limpowitch.png";


class Settings extends Component{
    render()
    {
        return(
            <article class="DirectMessages">
                <div class="Contacts">
                    <Contact pfp = {def_pfp} name = "Chim" lastMsg = "wtf bro" />
                    <Contact pfp = {def_pfp} name = "Gigachad" lastMsg = "Very nice" />
                    <Contact pfp = {def_pfp} name = "Kapsyloffer" lastMsg = "u dum?" />
                    <Contact pfp = {def_pfp} name = "Challe" lastMsg = "where backend" />
                    <Contact pfp = {def_pfp} name = "Sandeep" lastMsg = "You two are the worst students I've ever had" />
                </div>
                <div class="chatWindow">
                    <div class ="topOfChat">
                        <img src={def_pfp} alt ="#" />
                        <b>Limpowitch</b>
                        <span>Follows you</span>
                        <button>Options</button>
                    </div>
                    <div class="messages">
                        <Chat from = "sender" content = "Fick springa till slemmis igår" />
                        <Chat from = "sender" content = "Sweet Sweet läskeblask och chibba uwu" />
                        <Chat from = "reciever" content = "Jag har inte orkat springa sen jag blev sjuk. Jag har blivit fet :(" />
                        <Chat from = "sender" content = "yo wtf bro Telia ska sparka mig så jag kommer att bli FATTIG reee" />
                        <Chat from = "reciever" content = "lmao where csn" />
                    </div>
                    <div class="chatTextbox">
                        <input type="text"/><button>Send</button>
                    </div>
                </div>
                
            </article>
            );
    }
}

export default Settings;