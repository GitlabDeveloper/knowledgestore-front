import {handleActions} from 'redux-actions';

const defaultState = {
    isLoading: false,
    isLoaded: false,
    isAuthenticated: false,
    currentUser: null,
    message: null
};

const authReducer = handleActions(
    {
        LOGIN_START: (state) => {
            return {...state, isAuthenticated: false, isLoading: true, isLoaded: false};
        },
        LOGIN_SUCCESS: (state) => {
            return {...state, isAuthenticated: true, isLoading: false, isLoaded: true, message: "Logged in successfully."};
        },
        LOGIN_FAILED: (state, action) => {
            return {...state, isAuthenticated: false, isLoading: false, isLoaded: false, message: action.payload.message};
        },
        GET_USER_START: (state) => {
            return {...state, isLoading: true, isLoaded: false};
        },
        GET_USER_SUCCESS: (state, action) => {
            return {...state, currentUser: action.payload, isLoading: false, isLoaded: true, message: `Hello ${action.payload.name}`};
        },
        GET_USER_FAILED: (state) => {
            return {...state, isLoading: false, isLoaded: false, message: "Cannot load user."};
        },
        LOGOUT: () => {
            return {...defaultState};
        },
    },
    defaultState
);

export default authReducer;