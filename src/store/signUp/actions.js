import {API_BASE_URL} from "../../constants/index";
import {request} from "../../utils/APIUtils";

export const signUp = (signUpRequest) => {
    return request({
        url: API_BASE_URL + "/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    });
};

export const checkUsernameAvailability = (username) => {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
};

export const checkEmailAvailability = (email) => {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
};

/*
export const {signUpStart, signUpSuccess, signUpFailed} = createActions({
    SIGN_UP_START: undefined,
    SIGN_UP_SUCCESS: (message) => ({message}),
    SIGN_UP_FAILED: (message) => ({message}),
});

export const {checkUsernameStart, checkUsernameSuccess, checkUsernameFailed} = createActions({
    CHECK_USERNAME_START: undefined,
    CHECK_USERNAME_SUCCESS: (message) => ({message}),
    CHECK_USERNAME_FAILED: (message) => ({message}),
});

export const {checkEmailStart, checkEmailSuccess, checkEmailFailed} = createActions({
    CHECK_EMAIL_START: undefined,
    CHECK_EMAIL_SUCCESS: (message) => ({message}),
    CHECK_EMAIL_FAILED: (message) => ({message}),
});

export const signUpAction = signUpRequest => dispatch => {
    dispatch(signUpStart());
    return request({
        url: API_BASE_URL + "/auth/signUp",
        method: 'POST',
        body: JSON.stringify(signUpRequest)
    })
        .then(response => {
            if(response.success) {
                dispatch(signUpSuccess(response.message));
            } else {
                throw response;
            }
        })
        .catch((error) => {
            const message = error.status === 400 ? error.message : "Sorry! Something went wrong. Please try again!";
            dispatch(signUpFailed(message));
        })
};

export const checkUsernameAvailability = username => dispatch => {
    dispatch(checkUsernameStart());
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    })
        .then(response => {
            if(response.available) {
                dispatch(checkUsernameSuccess(response.message));
            } else {
                throw "Username is not available.";
            }
        })
        .catch((error) => {
            const message = error.status === undefined ? error : "Sorry! Something went wrong. Please try again!";
            dispatch(checkUsernameFailed(message));
        })
};

export const checkEmailAvailability = email => dispatch => {
    dispatch(checkEmailStart());
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    })
        .then(response => {
            if(response.available) {
                dispatch(checkEmailSuccess(response.message));
            } else {
                throw "Email is not available.";
            }
        })
        .catch((error) => {
            const message = error.status === undefined ? error : "Sorry! Something went wrong. Please try again!";
            dispatch(checkEmailFailed(message));
        })
};*/
