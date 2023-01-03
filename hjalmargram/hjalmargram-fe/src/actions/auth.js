import Cookies from 'js-cookie';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`http://localhost:8000/api/kapsylgram/user/isauthenticated`, config);

        if (res.data.error || res.data.isAuthenticated === 'failure') {
            dispatch({
                type: 'AUTHENTICATED_FAIL',
                payload: false
            });
        }
        else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: 'AUTHENTICATED_SUCCESS',
                payload: true
            });
        }
        else {
            dispatch({
                type: 'AUTHENTICATED_FAIL',
                payload: false
            });
        }
    } catch(err) {
        dispatch({
            type: 'AUTHENTICATED_FAIL',
            payload: false
        });
    }
};

export const logout = () => async dispatch => {
    const res = await axios.post(`http://localhost:8000/api/kapsylgram/logout`);
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Remove the JWT from the axios default headers
    delete axios.defaults.headers.common['Authorization'];
};

export function getUserProfile() {
    const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!jwt) {
      // No JWT is stored in the cookie, so the user is not logged in
      return null;
    }
    const decodedJwt = jwtDecode(jwt);
    // The decoded JWT contains the user's information
    return decodedJwt;
}

export function useUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (jwt) {
        const decodedJwt = jwtDecode(jwt);
        setUser(decodedJwt);
      }
    }, []);
    return user;
}

export function checkLoggedIn() {
    const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (!jwt) {
      // No JWT is stored in the cookie, so the user is not logged in
      console.log(false);
      return false;
    }
    // The decoded JWT contains the user's information
    console.log(true);
    return true;
}