import React, { Component } from 'react';
import { getCurrentUser } from '../../util/helper/APIUtils';
import { Avatar } from 'antd';
import LoadingIndicator  from '../../components/animations/LoadingIndicator';
import './ProfileScreen.css';
import NotFound from '../../components/animations/notfound/NotFound';
import ServerError from '../../components/animations/servererror/ServerError';
import Address from '../address/Address';


class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            addresses: [],
            isLoading: false
        };
        this.loadProfileScreen = this.loadProfileScreen.bind(this);
    }

    loadProfileScreen() {
        this.setState({
            isLoading: true
        });

        getCurrentUser()
        .then(response => {
            this.setState({
                user: response,
                addresses: response.adresses,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount() {
        const username = this.props.match.params.username;
        this.loadProfileScreen(username);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.username !== nextProps.match.params.username) {
            this.loadProfileScreen();
        }
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return (

            <div className="profile">
                {
                    this.state.user ? (
                        <div className="user-profile">
                            <div className="user-details">
                                <div className="user-avatar">
                                    <Avatar className="user-avatar-circle" style={{ backgroundColor: '#3f51b5'}}>
                                        {this.state.user.username[0].toUpperCase()}
                                    </Avatar>
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{this.state.user.username.toUpperCase()}</div>
                                </div>
                            </div>
                        </div>
                    ): null
                }
                <Address addresses={this.state.addresses}/>
            </div>
        );
    }
}

export default ProfileScreen;
