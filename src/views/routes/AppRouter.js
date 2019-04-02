import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import Header from "../component/Header";
import NotFound from "../component/NotFound";
import browserHistory from "../../store/browserHistory";
import Login from "../component/auth/login/Login";
import SignUp from "../component/auth/signUp/SignUp";

const AppRouter = () => (
    <Router history={browserHistory}>
        <div className='container'>
            <Header/>
            <Switch>
                {<Route path="/login" component={Login}/>}
                {<Route path="/signUp" component={SignUp}/>}
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter;