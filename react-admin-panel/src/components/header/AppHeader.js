import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './AppHeader.css';
import {Icon, Layout, Menu} from 'antd';

const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems, title;
        if (this.props.currentUser) {
            title = [
                    <Link to="/home">Crud User</Link>
            ];
            menuItems = [
                <Menu.Item key="/home">
                    <Link to="/home">
                        <Icon type="home" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key='/profile'>g
                    <Link
                    to={`/users/${this.props.currentUser.username}`}>
                        <Icon type="user" className="nav-icon"/>
                    </Link>
                </Menu.Item>,
                <Menu.Item key='logout'>
                    <Icon type="logout" className="nav-icon"/>
                </Menu.Item>
            ];
        } else {
            title = [
                    <Link to="/signup">Crud User</Link>
            ];
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Connexion</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Inscription</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        {title}
                    </div>
                    <Menu
                        className="app-menu"
                        onClick={this.handleMenuClick}
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}


export default withRouter(AppHeader);
