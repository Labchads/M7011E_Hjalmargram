const initialState = {
    isAuthenticated: null
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case 'AUTHENTICATED_SUCCESS':
        case 'AUTHENTICATED_FAIL':
            return {
                ...state,
                isAuthenticated: payload
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                isAuthenticated: false
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true
            }
        case 'LOGOUT_SUCCESS':
        case 'DELETE_USER_SUCCESS':
            return {
                ...state,
                isAuthenticated: false
            }
        case 'REGISTER_FAIL':
        case 'LOGIN_FAIL':
        case 'LOGOUT_FAIL':
        case 'DELETE_USER_FAIL':
            return state
        default:
            return state
    };
};