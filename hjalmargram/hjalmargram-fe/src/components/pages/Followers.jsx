import React, { Component } from "react";
import { getUserProfile } from "../../actions/auth";
import axios from 'axios';
import './css/profile.css'
import Follower from "../Follower";

class Followers extends Component
{
    username = window.location.pathname.split("/")[2];
    state = {
        user: getUserProfile(),
        user_id: 0,
        followers: [],
    }

    componentDidMount() {
        axios.get(`http://localhost:8000/api/kapsylgram/profilename/${this.username}`)
          .then((res) => {
            this.setState({ user_id: res.data[0].pk });
            if(this.state.user_id == 0){return;}
            //console.log(this.username, "id: ", this.state.user_id);
            return axios.get(`http://localhost:8000/api/kapsylgram/profile/${res.data[0].pk}/followers`);
          })
          .then((res) => {
            this.setState({ followers: res.data });
            //console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      render() {
        return(
            <article>
                <p>Followers: {this.state.followers.length}</p>
                {this.state.followers.map(follower => (
                    <Follower
                        pic={follower.pfp}
                        displayName={follower.displayname}
                        userName={follower.username}
                    />
                ))}
            </article>
        )
    }
}

export default Followers;