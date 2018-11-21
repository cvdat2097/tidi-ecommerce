import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import './assets/scss/style.scss';

import Header from './pages/layout/Header';
import Footer from './pages/layout/Footer';
import Cart from './pages/common/Cart';
import Products from './pages/products/Products';
import ProductDetail from './pages/products/ProductDetail';
import CheckoutDetail from './pages/checkout/CheckoutDetail';
import AdminUser from './pages/admin/AdminUser';

import Auth from './pages/common/Auth/Auth';

import CONSTANT from './config/constants';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>

            <Route path={CONSTANT.ROUTE.ADMIN.HOME} component={() =>
              <div className="admin-wrapper">
                {/* ADMIN HEADER HERE */}
                <div className="admin-content">
                  <Switch>
                    <Route exact path={CONSTANT.ROUTE.ADMIN.USER} component={AdminUser} />
                  </Switch>
                </div>
                {/* ADMIN FOOTER HERE */}
              </div>
            } />

            <Route exact path={CONSTANT.ROUTE.LOGIN} component={() => <Auth loginForm={true} />} />
            <Route exact path={CONSTANT.ROUTE.REGISTER} component={() => <Auth loginForm={false} />} />
            <Route exact path={CONSTANT.ROUTE.RESET_PASSWORD} component={() => <Auth resetForm={true} />} />
            
            <Route path={CONSTANT.ROUTE.HOME} component={() =>
              <div className="main-wrapper">
                <Header />
                <Cart />
                <div className="main-content">
                  <Switch>
                    <Route path={CONSTANT.ROUTE.PRODUCTS} component={Products} />
                    <Route path={CONSTANT.ROUTE.PRODUCT_DETAIL} component={ProductDetail} />
                    <Route path={CONSTANT.ROUTE.CHECKOUT} component={CheckoutDetail} />
                  </Switch>
                </div>
                <Footer />
              </div>
            } />
            <Route component={() => <div>ERROR 404</div>} />
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
