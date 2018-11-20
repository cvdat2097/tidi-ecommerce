import React, { Component } from 'react';
import './App.scss';

import Header from './layouts/Header/Header';
import Footer from './layouts/Footer/Footer';
import Cart from './pages/Cart/Cart';

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Cart />
        <div className="main-content">
          d
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
