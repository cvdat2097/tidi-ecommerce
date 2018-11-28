import Request from 'request';
import COSNTANT from '../config/constants';

const apiPrefix = {
    authentication: '/auth',
    account: '/account',
    product: '/product',
    cart: '/cart',
    checkout: '/checkout',
    admin: '/admin'
}

const fetch = ({ method, reqBody, route }) => {
    return new Promise((resolve, reject) => {
        Request({
            method,
            uri: COSNTANT.REST_SERVER + route,
            qs: reqBody && (method === 'POST' ? reqBody : undefined),
            body: reqBody && (method === 'POST' ? JSON.stringify(reqBody) : undefined)
        }, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        });
    });
}

export default {
    fetch,

    /*
    *       SECTION 1: AUTHENTICATION
    */

    // 1.1 Login
    login: (username, password) => {
        return fetch({
            method: 'POST',
            reqBody: {
                username,
                password
            },
            route: apiPrefix.authentication + '/login'
        });
    },

    // 1.2 Registration
    register: (username, password, email, fullName, dateOfBirth, phone, gender, address, avatar) => {
        return fetch({
            method: 'POST',
            reqBody: {
                username,
                password,
                email,
                fullName,
                dateOfBirth,
                phone,
                gender,
                address,
                avatar
            },
            route: apiPrefix.authentication + '/register'
        });
    },

    // 1.3 Registration email verification
    verifyEmail(verificationCode) {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/verifyEmail'
        });
    },

    // 1.4 Reset password
    resetPassword(username) {
        return fetch({
            method: 'POST',
            reqBody: {
                username
            },
            route: apiPrefix.authentication + '/resetPassword'
        });
    },

    // 1.5 Reset password email verification 
    verifyEmailResetPassword(verificationCode) {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/resetPasswordVerification'
        });
    },


    /*
    *       SECTION 2: ACCOUNT
    */

    // 2.1 READ Account information
    readAccountInfo: (token) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token
            },
            route: apiPrefix.account + '/info'
        });
    },

    // 2.2 UPDATE Account information 
    updateAccountInfo: (token, { dateOfBirth, address, avatar }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                newInfo: {
                    dateOfBirth,
                    address,
                    avatar
                },
                route: apiPrefix.account + '/updateInfo'
            }
        });
    },

    // 2.3 UPDATE Account password 
    updateAccountPassword: (token, password, newPassword) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                password,
                newPassword,
            },
            route: apiPrefix.account + '/updatePassword'
        });
    },


    /*
    *       SECTION 3: PRODUCT
    */

    // 3.1 Get all industries
    getAllIndustries: () => {
        return fetch({
            method: 'GET',
            route: apiPrefix.product + '/industry'
        });
    },

    // 3.2 Get all brands
    getAllBrands: () => {
        return fetch({
            method: 'GET',
            route: apiPrefix.product + '/branch'
        });
    },

    // 3.3 Get all products
    getAllProducts: (limit, offset, { industryId, branchId, categoryId, brandId, keyword, minPrice, maxPrice }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    industryId, branchId,
                    categoryId,
                    brandId,
                    keyword,
                    minPrice,
                    maxPrice
                },
            },
            route: apiPrefix.product + '/all'
        });
    },

    // 3.4 Get one product
    getProduct: (id) => {
        return fetch({
            method: 'GET',
            reqBody: {
                id
            },
            route: apiPrefix.product + '/one'
        });
    },


    /*
    *       SECTION 4: CART
    */

    // 4.1 Get all items in cart 
    getCart: (token) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token
            },
            route: apiPrefix.cart + '/all'
        });
    },

    // 4.2 Insert item
    addItemToCart: (token, productId, amount) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                productId,
                amount
            },
            route: apiPrefix.cart + '/item'
        });
    },

    // 4.3 Update item
    updateItemToCart: (token, productId, amount) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                productId,
                amount
            },
            route: apiPrefix.cart + '/update'
        });
    },

    // 4.4 Delete item
    deleteItemToCart: (token, productId) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
                productId,
            },
            route: apiPrefix.cart + '/delete'
        });
    },


    /*
    *       SECTION 5: CHECKOUT
    */

    // 5.1 Checkout (Cart to Order) 
    toCheckout: (token) => {
        return fetch({
            method: 'POST',
            reqBody: {
                token,
            },
            route: apiPrefix.checkout + '/order'
        });
    },

    // 5.2 Get all orders
    getAllOrders: (token) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token,
            },
            route: apiPrefix.checkout + '/order/all'
        });
    },

    // 5.3 Get one order
    getOneOrder: (token, orderId) => {
        return fetch({
            method: 'GET',
            reqBody: {
                token,
                orderId
            },
            route: apiPrefix.checkout + '/order/one'
        });
    },

    
}
