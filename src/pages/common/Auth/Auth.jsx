import React from 'react';
import './Auth.scss';

import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

export default class Auth extends React.Component {
    render() {
        if (this.props.resetForm) {
            return <ResetPassword {...this.props} />
        }
        return (this.props.loginForm ? <Login {...this.props} /> : <Register {...this.props} />);
    }
}
