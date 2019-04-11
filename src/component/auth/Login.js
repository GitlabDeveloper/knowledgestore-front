import React from 'react';
import {withSnackbar} from 'notistack';
import {Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, Paper} from '@material-ui/core';
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import {getCurrentUserAction, loginAction} from "../../store/auth/actions";

class Login extends React.Component {

    state = {
        email: "",
        password: "",
        remember: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const loginRequest = {email: this.state.email, password: this.state.password, remember: this.state.remember};

        this.props.onLogin(loginRequest)
            .then(() => {
                this.props.enqueueSnackbar(this.props.message, {variant: 'success'});
                this.props.getCurrentUser();
                this.props.history.push("/");
            })
            .catch(() => {
                this.props.enqueueSnackbar("Sorry! Something went wrong. Please try again!", {variant: 'error'});
            })
    };

    handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [inputName]: inputValue
        });
    };

    render() {
        return (
            <Paper className="paper">
                <form onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            autoFocus
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                        />
                    </FormControl>
                    <FormControlLabel
                        control={<Checkbox id="remember" name="remember" color="primary"/>}
                        label="Remember me"
                        checked={this.state.remember}
                        onChange={this.handleInputChange}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary"> Sign in </Button>
                    Don't have account? <Link to="/signUp">Sign up</Link>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.authReducer.isLoading,
        message: state.authReducer.message
    }
};

const mapDispatchToProps = dispatch => ({
    onLogin: loginRequest => dispatch(loginAction(loginRequest)),
    getCurrentUser: () => dispatch(getCurrentUserAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Login))
