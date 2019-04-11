import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route, Switch} from 'react-router';
import Header from "../component/Header";
import NotFound from "../component/NotFound";
import browserHistory from "../store/browserHistory";
import Login from "../component/auth/Login";
import SignUp from "../component/signUp/SignUp";
import {getCurrentUserAction} from "../store/auth/actions";
import connect from "react-redux/es/connect/connect";
import {withSnackbar} from "notistack";
import PrivateRoute from "../component/PrivateRoute";
import AuthRoute from "../component/AuthRoute";
import {CircularProgress} from '@material-ui/core';

class AppRouter extends React.Component {

    onGetCurrentUser = () => {
        this.props.getCurrentUser()
            .then(() => {
                if (this.props.currentUser) {
                    this.props.enqueueSnackbar(this.props.message, {variant: 'success'});
                }
            })
            .catch(() => {
                this.props.enqueueSnackbar("Not authorized", {variant: 'warning'});
            });
    };

    componentDidMount() {
        this.onGetCurrentUser();
    }

    render() {
        return (
            <Router history={browserHistory}>
                <div className='container'>
                    <Header/>
                    {this.props.isLoading ? (
                        <CircularProgress color="primary"/>
                    ) : (
                        <Switch>
                            <AuthRoute
                                authenticated={this.props.isAuthenticated}
                                path="/login"
                                component={Login}
                                onGetCurrentUser={this.onGetCurrentUser}
                            />
                            <AuthRoute authenticated={this.props.isAuthenticated} path="/signUp" component={SignUp}/>

                            <PrivateRoute
                                authenticated={this.props.isAuthenticated}
                                path="/myPage"
                                component={undefined}
                            />
                            <Route component={NotFound}/>
                        </Switch>
                    )}
                </div>
            </Router>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        isLoading: state.authReducer.isLoading,
        message: state.authReducer.message,
        currentUser: state.authReducer.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUserAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AppRouter))