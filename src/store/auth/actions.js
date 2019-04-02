import createActions from "redux-actions/es/createActions";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants/index";
import {request} from "../../utils/APIUtils";

export const {loginStart, loginSuccess, loginFailed, logout} = createActions({
    LOGIN_START: undefined,
    LOGIN_SUCCESS: undefined,
    LOGIN_FAILED: message => ({message}),
    LOGOUT: undefined
});

export const {getUserStart, getUserSuccess, getUserFailed} = createActions({
    GET_USER_START: undefined,
    GET_USER_SUCCESS: (response) => (response),
    GET_USER_FAILED: undefined,
});

export const loginAction = loginRequest => dispatch => {
    dispatch(loginStart());
    return request({
        url: API_BASE_URL + "/auth/signIn",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    })
        .then(response => {
            if (loginRequest.remember) {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            } else {
                sessionStorage.setItem(ACCESS_TOKEN, response.accessToken);
            }
            dispatch(loginSuccess());
        })
        .catch(error => {
            const message = error.status === 401 ?
                "Your Username or Password is incorrect. Please try again!" :
                "Sorry! Something went wrong. Please try again!";
            dispatch(loginFailed(message));
        })
};

export const logoutAction = () => dispatch => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch(logout());
};

export const getCurrentUserAction = () => dispatch => {
    dispatch(getUserStart());
    if (!sessionStorage.getItem(ACCESS_TOKEN) && !localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject();
    }
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    })
        .then(response => {
            dispatch(loginSuccess());
            dispatch(getUserSuccess(response));
        })
        .catch(() => {
            dispatch(getUserFailed());
        })
};