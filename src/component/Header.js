import React from 'react';
import {Button} from "@material-ui/core";
import {logoutAction} from "../store/auth/actions";
import connect from "react-redux/es/connect/connect";
import {withSnackbar} from "notistack";
import {Link} from "react-router-dom";

class Header extends React.Component {

    handleLogout = () => {
        this.props.onLogout();
        this.props.enqueueSnackbar("Log out", {variant: 'info'});
    };

    render() {
        return (
            <div>
                <Link to="/"><h1>Header</h1></Link>
                {this.props.currentUser ? <h2>{this.props.currentUser.name}</h2> : null}
                {this.props.isAuthenticated ?
                    <Button variant="contained" color="secondary" onClick={this.handleLogout}> Log out </Button>
                    :
                    <Button variant="contained" color="primary" component={Link} to="/login"> Login </Button>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        currentUser: state.authReducer.currentUser
    }
};

const mapDispatchToProps = dispatch => ({
    onLogout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Header))