import React, { Component } from 'react';
import './App.css';
import {
  Route,
  withRouter,
  Switch
} from 'react-router-dom';

import { getCurrentUser } from '../util/helper/APIUtils';
import { ACCESS_TOKEN } from '../constants';

import LoginScreen from '../screens/login/LoginScreen';
import SignupScreen from '../screens/signup/SignupScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import Users from '../screens/users/UsersScreen';
import AppHeader from '../components/header/AppHeader';
// import NotFound from '../common/NotFound';
import LoadingIndicator from '../components/animations/LoadingIndicator';

import { Layout } from 'antd';
const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  loadCurrentUser() {
      this.setState({
        isLoading: true
      });
      getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(error => {
        this.setState({
          isLoading: false
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo="/login") {
      localStorage.removeItem(ACCESS_TOKEN);

      this.setState({
        currentUser: null,
        isAuthenticated: false
      });

      this.props.history.push(redirectTo);

      alert("You're successfully logged out.");
  }

  handleLogin() {
      alert("You're successfully logged in.");
      this.loadCurrentUser();
      this.props.history.push("/home");
  }

  render() {
    if(this.state.isLoading) {
      return <LoadingIndicator />
    }
    return (
        <Layout className="app-container">
          <AppHeader isAuthenticated={this.state.isAuthenticated}
            currentUser={this.state.currentUser}
            onLogout={this.handleLogout} /><br/>
          <Content className="app-content">
            <br/>
            <div className="container">
              <Switch>
                <Route exact path="/home"
                    render={(props) => <Users />}>
                </Route>
                <Route exact path="/login"
                  render={(props) => <LoginScreen onLogin={this.handleLogin} {...props} />}></Route>
                  <Route exact path="/"
                  render={(props) => <LoginScreen onLogin={this.handleLogin} {...props} />}></Route>
                <Route path="/signup" component={SignupScreen}></Route>
                <Route path="/users/:username"
                  render={(props) => <ProfileScreen isAuthenticated={this.state.isAuthenticated} currentUser={this.state.currentUser} {...props}  />}>
                </Route>
                {/* <Route component={NotFound}></Route> */}
              </Switch>
            </div>
          </Content>
        </Layout>
    );
  }
}

export default withRouter(App);
