import React, { Component } from "react";

import axios from 'axios';

class UserList extends Component {
    state = {
        users: []
    };
    componentDidMount() {
        this.resetState();
    }
    getUsers = () => {
        axios.get("http://localhost:8000/api/kapsylgram/").then(res => this.setState({ users: res.data }));
    };
    resetState = () => {
        this.getUsers();
    };
}