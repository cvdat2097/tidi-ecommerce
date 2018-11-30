import React from 'react';
import { Route } from 'react-router-dom';

export default route => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => <route.component routes={route.routes} {...props} />}
    />
);
