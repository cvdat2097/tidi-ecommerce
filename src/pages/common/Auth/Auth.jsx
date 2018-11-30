import React from 'react';
import './Auth.scss';

import Login from './Login';
import Register from './Register';
import ResetPassword from './ResetPassword';

import { Redirect } from 'react-router-dom';
import { ROUTE_NAME } from '../../../routes/main.routing';
export default class Auth extends React.Component {
    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to={ROUTE_NAME.HOME} />
        }

        if (this.props.resetForm) {
            return <ResetPassword {...this.props} />
        }
        return (this.props.loginForm ? <Login {...this.props} /> : <Register {...this.props} />);
    }
}
