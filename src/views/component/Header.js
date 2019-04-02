import React from 'react';
import {Button} from "@material-ui/core";
import {logoutAction} from "../../store/auth/actions";
import connect from "react-redux/es/connect/connect";
import {withSnackbar} from "notistack";
import {getCurrentUserAction} from "../../store/auth/actions";

class Header extends React.Component {

    //todo перенести в контейнер(может быть в AppRouter)
    componentDidMount() {
        this.props.getCurrentUser()
            .then(() => {
                if (this.props.currentUser && !this.props.isLoading) {
                    this.props.enqueueSnackbar(this.props.message, {variant: 'success'});
                }
            })
            .catch(() => {
                this.props.enqueueSnackbar("Not authorized", {variant: 'warning'});
            });
    }

    handleLogout = () => {
        this.props.onLogout();
        this.props.enqueueSnackbar("Log out", {variant: 'info'});
    };

    render() {
        return (
            <div>
                <h1>Header</h1>
                {this.props.currentUser ? <h2> {this.props.currentUser.name}</h2> : null}
                {this.props.isAuthenticated ?
                    <Button variant="contained" color="secondary" onClick={this.handleLogout}> Log out </Button>
                    :
                    <Button variant="contained" color="primary" href="/login"> Login </Button>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        currentUser: state.authReducer.currentUser,
        isLoading: state.authReducer.isLoading,
        message: state.authReducer.message
    }
};

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logoutAction()),
    getCurrentUser: () => dispatch(getCurrentUserAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Header))