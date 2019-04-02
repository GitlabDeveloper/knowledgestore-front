import React, {Component} from "react";
import {checkEmailAvailability, checkUsernameAvailability} from "../../../../utils/APIUtils";
import {Button, FormControl, FormLabel, Input, InputAdornment, IconButton, InputLabel, Paper} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {withSnackbar} from "notistack";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from '../../../../constants/index';
import {signUpAction} from "../../../../store/signUp/actions";

class SignUp extends Component {

    state = {
        showPassword: false,
        name: {
            value: ''
        },
        username: {
            value: ''
        },
        email: {
            value: ''
        },
        password: {
            value: ''
        }
    };

    handleInputChange = (event, validationFun) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const signUpRequest = {
            name: this.state.name.value,
            email: this.state.email.value,
            username: this.state.username.value,
            password: this.state.password.value
        };
        this.props.onSignUp(signUpRequest)
            .then(() => {
                this.props.enqueueSnackbar(this.props.message, {variant: 'success'});
                this.props.history.push("/login");
            })
            .catch(() => {
                this.props.enqueueSnackbar(this.props.message, {variant: 'error'});
            });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    };

    render() {
        return (
            <Paper className="paper">
                <form onSubmit={this.handleSubmit}>
                    <FormControl margin="normal" required fullWidth error={this.state.name.validateStatus === "error"}>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input
                            id="name"
                            name="name"
                            type="name"
                            autoComplete="off"
                            autoFocus
                            value={this.state.name.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}
                        />
                    </FormControl>
                    <FormLabel error>{this.state.name.errorMsg}</FormLabel>

                    <FormControl
                        margin="normal"
                        required
                        fullWidth
                        error={this.state.username.validateStatus === "error"}
                    >
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            name="username"
                            type="username"
                            autoComplete="off"
                            value={this.state.username.value}
                            onBlur={() => this.validateUsernameAvailability()}
                            onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                        />
                    </FormControl>
                    <FormLabel error>{this.state.username.errorMsg}</FormLabel>

                    <FormControl margin="normal" required fullWidth error={this.state.email.validateStatus === "error"}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={this.state.email.value}
                            onBlur={() => this.validateEmailAvailability()}
                            onChange={(event) => this.handleInputChange(event, this.validateEmail)}
                        />
                    </FormControl>
                    <FormLabel error>{this.state.email.errorMsg}</FormLabel>

                    <FormControl margin="normal" required fullWidth
                                 error={this.state.password.validateStatus === "error"}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            autoComplete="off"
                            value={this.state.password.value}
                            onChange={(event) => this.handleInputChange(event, this.validatePassword)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormLabel error>{this.state.password.errorMsg}</FormLabel>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={this.isFormInvalid()}
                    >
                        Sign up
                    </Button>
                    Already registered? <Link to="/login">Login now!</Link>
                </form>
            </Paper>
        )
    }

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    };

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    };

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }
//todo перенести в actions
        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(() => {
            // Marking validateStatus as success, Form will be rechecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    };

    validateEmailAvailability = () => {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }
//todo перенести в actions
        checkEmailAvailability(emailValue)
            .then(response => {
                if (response.available) {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        email: {
                            value: emailValue,
                            validateStatus: 'error',
                            errorMsg: 'This Email is already registered'
                        }
                    });
                }
            }).catch(() => {
            // Marking validateStatus as success, Form will be rechecked at server
            this.setState({
                email: {
                    value: emailValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    };

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.signUpReducer.isLoading,
        isLoaded: state.signUpReducer.isLoaded,
        message: state.signUpReducer.message
    }
};

const mapDispatchToProps = dispatch => ({
    onSignUp: signUpRequest => dispatch(signUpAction(signUpRequest))
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(SignUp))