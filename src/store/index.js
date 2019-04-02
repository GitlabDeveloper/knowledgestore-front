import {combineReducers} from 'redux'
import authReducer from "./auth/reducer";
import signUpReducer from "./signUp/reducer";

const rootReducer = combineReducers({
	authReducer,
    signUpReducer
});

export default rootReducer;