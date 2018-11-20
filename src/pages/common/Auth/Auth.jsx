import React from 'react';
import './Auth.scss';

import Login from './Login';
import Register from './Register';

export default class Auth extends React.Component {
    render() {
        return (this.props.loginForm ? <Login /> : <Register />);
    }
}
