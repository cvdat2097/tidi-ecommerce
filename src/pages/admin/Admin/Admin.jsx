import React from 'react';
import './Admin.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import CONSTANT from '../../../config/constants';

import AdminUser from '../AdminUser';

export default class Admin extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path={CONSTANT.ROUTE.ADMIN.USER} component={AdminUser} />
                <Route component={() => <Redirect to={CONSTANT.ROUTE.ADMIN.USER} />}></Route>
            </Switch>
        );
    }
}