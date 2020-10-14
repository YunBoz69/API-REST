import React, { Component } from 'react';
import { login } from '../../util/helper/APIUtils';
import './LoginScreen.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';
import { TextField, Button } from "@material-ui/core";
import { Form, Icon} from 'antd';
const FormItem = Form.Item;

class LoginScreen extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Connexion</h1><br/>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.token);
                    this.props.onLogin();
                }).catch(error => {
                    if(error.status === 401) {
                        alert("Your Username or Password is incorrect. Please try again!")
                    } else {
                        alert(error.message || 'Sorry! Something went wrong. Please try again!');
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username !' }],
                    })(
                    <TextField
                        prefix={<Icon type="user" />}
                        size="large"
                        name="username"
                        placeholder="Nom d'utilisateur " />
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <TextField
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password"
                        type="password"
                        placeholder="Mot de passe"  />
                )}
                </FormItem>
                <FormItem>
                    <Button color="primary" type="primary" variant="contained" htmlType="submit" size="large" className="login-form-button">Connexion</Button>
                    Ou <Link to="/signup">inscrivez-vous !</Link>
                </FormItem>
            </Form>
        );
    }
}


export default LoginScreen;
