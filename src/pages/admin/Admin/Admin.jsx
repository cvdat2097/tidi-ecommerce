// Stylesheet
import './Admin.scss';

// External dependencies
import React from 'react';

// Internal dependencies
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
