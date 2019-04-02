import createActions from "redux-actions/es/createActions";
import {API_BASE_URL} from "../../constants/index";
import {request} from "../../utils/APIUtils";

export const {signUpStart, signUpSuccess, signUpFailed} = createActions({
    SIGN_UP_START: undefined,
    SIGN_UP_SUCCESS: (message) => ({message}),
    SIGN_UP_FAILED: (message) => ({message}),
});

export const signUpAction = signUpRequest => dispatch => {
    dispatch(signUpStart());
    return request({
        url: API_BASE_URL + "/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    })
        .then(response => {
            dispatch(signUpSuccess(response.message));
        })
        .catch((error) => {
            const message = error.status === 400 ? error.message : "Sorry! Something went wrong. Please try again!";
            dispatch(signUpFailed(message));
        })
};