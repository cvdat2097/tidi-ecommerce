import React from 'react';
import { Route } from 'react-router-dom';

import AuthService from '../services/AuthService';
import { USER_TYPE } from '../config/constants';

const INTIIAL_STATE = {
    tokenVerificationCompleted: false,
    isLoggedIn: false,
    permission: null,
    username: null,
}

class HOC extends React.Component {
    constructor(props) {
        super(props);

        console.log(`Required permission: ${props.requiredPermission}`, props.location.pathname);
        this.state = INTIIAL_STATE;
    }

    componentDidMount() {
        AuthService.isLoggedIn().then(res => {
            let newState = {};
            newState.tokenVerificationCompleted = true;

            if (res.tokenIsValid) {
                newState.isLoggedIn = true;
                newState.username = res.username;
                newState.permission = res.permission;
            }

            
            this.setState(newState);
        });
    }

    render() {
        if (this.state.tokenVerificationCompleted) {
            if (this.props.requiredPermission === USER_TYPE.PUBLIC
                || (this.props.requiredPermission === this.state.permission)) {

                return <this.props.component {...this.props} {...this.state} />;
            } else {
                return <div>You don't have permission to access this page</div>
            }
        }
        return <div>Token is not verified</div>;
    }
}

export default route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => <HOC requiredPermission={route.permission} component={route.component} routes={route.routes} {...props} />}
    />
);
