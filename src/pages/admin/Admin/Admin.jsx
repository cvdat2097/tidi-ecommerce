import React from 'react';
import './Admin.scss';

import AdminNavBar from './AdminNavBar';

import RouteWithSubRoutes from '../../../routes/RouteWithSubRoutes';

export default (props) => (
    <div className="wrapper">
        <AdminNavBar {...props} />
        <div className="page-wrapper">
            {props.routes.map((route, index) => {
                return <RouteWithSubRoutes key={index} {...route} exact={true} />;
            })}
        </div>
    </div>
);
