// StyleSheets
import './RouteWithSubRoutes.scss';

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import AuthService from '../services/AuthService';
import { Route } from 'react-router-dom';
import { USER_TYPE } from '../config/constants';

import Loader from '../pages/common/Loader/Loader';

const INTIIAL_STATE = {
    tokenVerificationCompleted: false,
    isLoggedIn: false,
    permission: null,
    username: null,
}

class HOC extends React.Component {
    static propTypes = {
        requiredPermission: PropTypes.oneOf([USER_TYPE.ADMIN, USER_TYPE.CUSTOMER, USER_TYPE.PUBLIC]),
        permission: PropTypes.oneOf([USER_TYPE.ADMIN, USER_TYPE.CUSTOMER, USER_TYPE.PUBLIC]),
        component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    }

    constructor(props) {
        super(props);

        // console.log(`Required permission: ${props.requiredPermission}`, props.location.pathname);
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
            newState.isVerified = res.emailIsVerified;

            this.setState(newState);
        });
        window.scrollTo(0, 0);
    }

    render() {
        if (this.state.tokenVerificationCompleted) {
            if (this.props.requiredPermission === USER_TYPE.PUBLIC
                || this.state.permission === USER_TYPE.ADMIN
                || this.props.requiredPermission === this.state.permission) {

                return <this.props.component {...this.props} {...this.state} />;
            } else {
                return (
                    <div className="d-flex justify-content-center align-items-center p5">
                        You don't have permission to access this page
                    </div>
                );
            }
        }
        return (
            <Loader />
        );
    }
}

export default route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => <HOC requiredPermission={route.permission} component={route.component} routes={route.routes} {...props} />}
    />
);
