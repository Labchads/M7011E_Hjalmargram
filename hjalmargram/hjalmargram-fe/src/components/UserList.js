import React, { Component } from "react";
import { Table } from "reactstrap";
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
    render() {
        this.getUsers();
        const users = this.state.users
      return (
        <Table dark>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th></th>
                </tr>
            </thead>
            {!users || users.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
            ) : (
                users.map(user => (
                <tr key={user.pk}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.username}</td>
                </tr>
                ))
            )}
            
        </Table>
      );
    }
}

export default UserList;