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

class AppRouter extends React.Component {

    componentDidMount() {
        this.props.getCurrentUser()
            .then(() => {
                if (this.props.currentUser) {
                    this.props.enqueueSnackbar(this.props.message, {variant: 'success'});
                }
            })
            .catch(() => {
                this.props.enqueueSnackbar("Not authorized", {variant: 'warning'});
            });
    }

    /*todo если авторизован, должно редиректить на другую страницу*/
    render() {
        return (
            <Router history={browserHistory}>
                <div className='container'>
                    <Header/>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/signUp" component={SignUp}/>
                        {/*приватный роутер, сюда вставлять любые компоненты, которые не должны быть доступны без авторизацтт*/}
                        <PrivateRoute
                            authenticated={this.props.isAuthenticated}
                            path="/myPage"
                            component={undefined}
                        />
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    };
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        message: state.authReducer.message,
        currentUser: state.authReducer.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUserAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AppRouter))