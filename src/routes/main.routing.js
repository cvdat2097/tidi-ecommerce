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
import AdminProduct from '../pages/admin/AdminProduct';

import { USER_TYPE } from '../config/constants';

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
        permission: USER_TYPE.ADMIN,
        routes: [
            {
                path: ROUTE_NAME.ADMIN.USER,
                component: AdminUser,
                permission: USER_TYPE.ADMIN,
            },
            {
                path: ROUTE_NAME.ADMIN.PRODUCT,
                component: AdminProduct,
                permission: USER_TYPE.ADMIN,
            },
            {
                path: ROUTE_NAME.ADMIN.COUPON,
                component: () => <div>Admin Coupon</div>,
                permission: USER_TYPE.ADMIN,
            },
            {
                path: ROUTE_NAME.ADMIN.HOME,
                component: () => <Redirect to={ROUTE_NAME.ADMIN.USER} />,
                permission: USER_TYPE.ADMIN,
            }
        ]
    },
    {
        path: ROUTE_NAME.LOGIN,
        component: (props) => <Auth {...props} loginForm={true} />,
        permission: USER_TYPE.PUBLIC,
    },
    {
        path: ROUTE_NAME.REGISTER,
        component: (props) => <Auth {...props} loginForm={false} />,
        permission: USER_TYPE.PUBLIC,
    },
    {
        path: ROUTE_NAME.RESET_PASSWORD,
        component: (props) => <Auth {...props} resetForm={true} />,
        permission: USER_TYPE.PUBLIC,
    },

    {
        path: ROUTE_NAME.HOME,
        component: (props) => (
            <div className="main-wrapper">
                <Header {...props} />
                <Cart {...props} />
                <div className="main-content">
                    {props.routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
                </div>
                <Footer />
            </div>
        ),
        permission: USER_TYPE.PUBLIC,
        routes: [
            {
                path: ROUTE_NAME.PRODUCTS,
                component: Products,
                permission: USER_TYPE.PUBLIC,

            },
            {
                path: ROUTE_NAME.PRODUCT_DETAIL + '/:id',
                component: ProductDetail,
                permission: USER_TYPE.PUBLIC,

            },
            {
                path: ROUTE_NAME.CHECKOUT,
                component: CheckoutDetail,
                permission: USER_TYPE.CUSTOMER,

            }
        ]
    },
];

export default ROUTES;
