import React from 'react';
import { Redirect } from 'react-router-dom';

import RouteWithSubRoutes from './RouteWithSubRoutes';

import Header from '../pages/layout/Header';
import Footer from '../pages/layout/Footer';
import Auth from '../pages/common/Auth';
import Cart from '../pages/common/Cart';
import Products from '../pages/products/Products';
import ProductDetail from '../pages/products/ProductDetail';
import CheckoutDetail from '../pages/checkout/CheckoutDetail';
import Admin from '../pages/admin/Admin';
import AdminUser from '../pages/admin/AdminUser';

export const ROUTE_NAME = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/reset-password',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product',
    CHECKOUT: '/checkout',
    ADMIN: {
        HOME: '/admin',
        USER: '/admin/user',
        PRODUCT: '/admin/product',
        COUPON: '/admin/coupon'
    }
};

const ROUTES = [
    {
        path: ROUTE_NAME.ADMIN.HOME,
        component: Admin,
        routes: [
            {
                path: ROUTE_NAME.ADMIN.USER,
                component: AdminUser
            },
            {
                path: ROUTE_NAME.ADMIN.PRODUCT,
                component: () => <div>Admin Product</div>
            },
            {
                path: ROUTE_NAME.ADMIN.COUPON,
                component: () => <div>Admin Coupon</div>
            },
            {
                path: ROUTE_NAME.ADMIN.HOME,
                component: () => <Redirect to={ROUTE_NAME.ADMIN.USER} />
            }
        ]
    },
    {
        path: ROUTE_NAME.LOGIN,
        component: () => <Auth loginForm={true} />,
    },
    {
        path: ROUTE_NAME.REGISTER,
        component: () => <Auth loginForm={false} />,
    },
    {
        path: ROUTE_NAME.RESET_PASSWORD,
        component: () => <Auth resetForm={true} />,
    },

    {
        path: ROUTE_NAME.HOME,
        component: (props) => (
            <div className="main-wrapper">
                <Header />
                <Cart />
                <div className="main-content">
                    {props.routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
                </div>
                <Footer />
            </div>
        ),
        routes: [
            {
                path: ROUTE_NAME.PRODUCTS,
                component: Products,
            },
            {
                path: ROUTE_NAME.PRODUCT_DETAIL + '/:id',
                component: ProductDetail
            },
            {
                path: ROUTE_NAME.CHECKOUT,
                component: CheckoutDetail
            }
        ]
    },
];

export default ROUTES;
