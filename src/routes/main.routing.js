// External Dependencies
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

// Internal Dependencies
import { USER_TYPE } from '../config/constants';

import RouteWithSubRoutes from './RouteWithSubRoutes';
import Header from '../pages/layout/Header';
import Footer from '../pages/layout/Footer';
import Auth from '../pages/common/Auth';
import Cart from '../pages/common/Cart';
import HomePage from '../pages/common/HomePage';
import Products from '../pages/products/Products';
import ProductDetail from '../pages/products/ProductDetail';
import Orders from '../pages/orders/Orders';
import CheckoutDetail from '../pages/checkout/CheckoutDetail';
import OrderDetail from '../pages/orders/OrderDetail';
import Admin from '../pages/admin/Admin';
import AdminUser from '../pages/admin/AdminUser';
import AdminProduct from '../pages/admin/AdminProduct';
import AdminBrand from '../pages/admin/AdminBrand';
import AdminOrder from '../pages/admin/AdminOrder';

export const ROUTE_NAME = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    RESET_PASSWORD: '/reset-password',
    PRODUCTS: '/products',
    PRODUCT_DETAIL: '/product',
    CHECKOUT: '/checkout',
    CHECKOUT_CALLBACK: '/checkout/callback',
    ORDERS: '/orders',
    ORDER_DETAIL: '/order',
    ADMIN: {
        HOME: '/admin',
        USER: '/admin/user',
        PRODUCT: '/admin/product',
        BRAND: '/admin/catalog',
        ORDER: '/admin/order',
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
                path: ROUTE_NAME.ADMIN.BRAND,
                component: AdminBrand,
                permission: USER_TYPE.ADMIN,
            },
            {
                path: ROUTE_NAME.ADMIN.ORDER,
                component: AdminOrder,
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
                    <Switch>
                        {props.routes.map((route, index) => <RouteWithSubRoutes key={index} {...route} />)}
                    </Switch>
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
                path: ROUTE_NAME.ORDERS,
                component: Orders,
                permission: USER_TYPE.CUSTOMER,
            },
            {
                path: ROUTE_NAME.ORDER_DETAIL + '/:id',
                component: OrderDetail,
                permission: USER_TYPE.CUSTOMER,
            },
            {
                path: ROUTE_NAME.CHECKOUT,
                component: CheckoutDetail,
                permission: USER_TYPE.CUSTOMER,
            },
            {
                path: ROUTE_NAME.HOME,
                component: HomePage,
                permission: USER_TYPE.PUBLIC,
            }
        ]
    },
];

export default ROUTES;
