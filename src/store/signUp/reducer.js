/*
import {handleActions} from 'redux-actions';

const defaultState = {
    isLoading: false,
    isLoaded: false,
    message: null
};

const signUpReducer = handleActions(
    {
        SIGN_UP_START: (state) => {
            return {...state, isLoading: true, isLoaded: false};
        },
        SIGN_UP_SUCCESS: (state) => {
            return {...state, isLoading: false, isLoaded: true};
        },
        SIGN_UP_FAILED: (state, action) => {
            return {...state, isLoading: false, isLoaded: false, message: action.payload.message};
        }
    },
    defaultState
);

export default signUpReducer;*/
