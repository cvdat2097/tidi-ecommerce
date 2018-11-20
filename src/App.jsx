import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';

import Header from './pages/common/layouts/Header';
import Footer from './pages/common/layouts/Footer';
import Cart from './pages/common/Cart';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-wrapper">
          <Header />
          <Cart />
          <div className="main-content">
            d
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
