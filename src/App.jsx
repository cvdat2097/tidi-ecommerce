// StyleSheets
import './App.scss';
import './assets/scss/style.scss';

// External Dependencies
import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// Internal Dependencies
import ROUTES from './routes/main.routing';
import RouteWithSubRoutes from './routes/RouteWithSubRoutes';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {ROUTES.map((route, index) => {
            return <RouteWithSubRoutes key={index} {...route} />;
          })}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
