import React from 'react';
import {Link} from 'react-router-dom';
import {withSnackbar} from "notistack";
import connect from "react-redux/es/connect/connect";
import {AppBar, Button, IconButton, Toolbar, Typography, withStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import { logoutAction} from "../store/auth/actions";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {

    handleLogout = () => {
        this.props.onLogout();
        this.props.enqueueSnackbar("Log out", {variant: 'info'});
    };

    render() {
        const { classes } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {this.props.currentUser && this.props.currentUser.name}
                    </Typography>
                    <Button>
                        <Link to="/quiz/1">Квиз 1</Link>
                    </Button>
                    <Button>
                        <Link to="/quiz/2">Квиз 2</Link>
                    </Button>
                    <Button>
                        <Link to="/teacher-page">Страница преподавателя</Link>
                    </Button>
                    {
                        this.props.isAuthenticated ?
                        <Button variant="contained" color="secondary" onClick={this.handleLogout}> Log out </Button>
                        :
                        <Button variant="contained" color="primary" href="/login"> Login </Button>
                    }
                </Toolbar>
            </AppBar>
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
    onLogout: () => dispatch(logoutAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withStyles(styles)(Header)))