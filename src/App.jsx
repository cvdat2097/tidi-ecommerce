import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './assets/scss/style.scss';

import Header from './pages/layout/Header';
import Footer from './pages/layout/Footer';
import Cart from './pages/common/Cart';

import Login from './pages/common/Login/Login';

class App extends Component {
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
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
