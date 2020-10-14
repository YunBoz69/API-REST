import React, { Component } from 'react';
import { signup, checkUsernameAvailability } from '../../util/helper/APIUtils';
import './SignupScreen.css';
import { Link } from 'react-router-dom';
import {
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH
} from '../../constants';
import { TextField, Button } from "@material-ui/core";

import { Form } from 'antd';
const FormItem = Form.Item;

class SignupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            },
            password: {
                value: ''
            }
        }
        this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
        this.checkIfUsernameExists = this.checkIfUsernameExists.bind(this);
        this.checkFormValidity = this.checkFormValidity.bind(this);
    }

    handleTextFieldChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSignupSubmit(event) {
        event.preventDefault();

        const signupRequest = {
            username: this.state.username.value,
            password: this.state.password.value
        };
        signup(signupRequest)
        .then(response => {
            alert("Thank you! You're successfully registered. Please LoginScreen to continue!");
            this.props.history.push("/login");
        }).catch(error => {
            alert('Sorry! Something went wrong. Please try again!');
        });
    }

    checkFormValidity() {
        return !(this.state.username.validateStatus === 'success' &&
            this.state.password.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Inscription</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSignupSubmit} className="signup-form">
                        <FormItem label="Username"
                            hasFeedback
                            validateStatus={this.state.username.validateStatus}
                            help={this.state.username.errorMsg}>
                            <TextField
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="Nom d'utilisateur"
                                value={this.state.username.value}
                                onBlur={this.checkIfUsernameExists}
                                onChange={(event) => this.handleTextFieldChange(event, this.validateUsername)} />
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <TextField
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="Mot de passe"
                                value={this.state.password.value}
                                onChange={(event) => this.handleTextFieldChange(event, this.validatePassword)} />
                        </FormItem>
                        <FormItem>
                            <Button
                                color="primary"
                                type="primary"
                                variant="contained"
                                size="large"
                                className="signup-form-button"
                                disabled={this.checkFormValidity()}>
                                Sign up
                            </Button>
                            Déja inscrit? <Link to="/login">Connectez-vous!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateUsername = (username) => {
        if(username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }

    checkIfUsernameExists() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if(usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
        .then(response => {
            if(response === true) {
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
        }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    }

    validatePassword = (password) => {
        if(password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default SignupScreen;
