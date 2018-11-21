import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './assets/scss/style.scss';

import Header from './pages/layout/Header';
import Footer from './pages/layout/Footer';
import Cart from './pages/common/Cart';

import Auth from './pages/common/Auth/Auth';

import API from './helpers/WebService';
import CONSTANT from './config/constants';

class App extends Component {

  componentDidMount() {
    API.fetch({
      method: 'POST',
      uri: 'http://localhost:3001',
      reqBody: {
        a: 1,
        b: 2
      }
    }).then()
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={() =>
              <div className="main-wrapper">
                <Header />
                <Cart />
                <div className="main-content">
                  kdjfd
                </div>
                <Footer />
              </div>
            } />
            <Route exact path={CONSTANT.ROUTE.LOGIN} component={() => <Auth loginForm={true} />} />
            <Route exact path={CONSTANT.ROUTE.REGISTER} component={() => <Auth loginForm={false} />} />
            <Route exact path={CONSTANT.ROUTE.RESET_PASSWORD} component={() => <Auth resetForm={true} />} />
            <Route component={() => <div>ERROR 404</div>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
