import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
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
        <div className="main-wrapper">
          <Header />
          <Cart />
          <div className="main-content">
            <Login />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
