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

const fetch = ({ method, reqBody, route, jwtToken }) => {
    return new Promise((resolve, reject) => {
        const HttpHeader = {
            'Content-Type': 'application/json',
        }

        if (jwtToken) {
            HttpHeader.Authorization = jwtToken;
        }

        Request({

            method,
            uri: COSNTANT.REST_SERVER + route,
            qs: reqBody && (method === 'POST' ? reqBody : undefined),
            body: reqBody && (method === 'POST' ? JSON.stringify(reqBody) : undefined),
            headers: HttpHeader
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
    verifyEmail: (verificationCode) => {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/verifyEmail'
        });
    },

    // 1.4 Reset password
    resetPassword: (username) => {
        return fetch({
            method: 'POST',
            reqBody: {
                username
            },
            route: apiPrefix.authentication + '/resetPassword'
        });
    },

    // 1.5 Reset password email verification 
    verifyEmailResetPassword: (verificationCode) => {
        return fetch({
            method: 'POST',
            reqBody: {
                verificationCode
            },
            route: apiPrefix.authentication + '/resetPasswordVerification'
        });
    },

    // 1.6 Verify Token 
    verifyToken: (token) => {
        return fetch({
            method: 'POST',
            reqBody: {
            },
            jwtToken: token,
            route: apiPrefix.authentication + '/verifyToken'
        });
    },


    /*
    *       SECTION 2: ACCOUNT
    */

    // 2.1 READ Account information
    readAccountInfo: (token) => {
        return fetch({
            method: 'POST',
            jwtToken: token,
            route: apiPrefix.account + '/info'
        });
    },

    // 2.2 UPDATE Account information 
    updateAccountInfo: (token, { dateOfBirth, address, avatar }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                newInfo: {
                    dateOfBirth,
                    address,
                    avatar
                },
            },
            jwtToken: token,
            route: apiPrefix.account + '/updateInfo'
        });
    },

    // 2.3 UPDATE Account password 
    updateAccountPassword: (token, password, newPassword) => {
        return fetch({
            method: 'POST',
            reqBody: {
                password,
                newPassword,
            },
            jwtToken: token,
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
            route: apiPrefix.product + '/brand'
        });
    },

    // 3.3 Get all products
    getAllProducts: (limit, offset, { industryId, branchId, categoryId, brandId, keyword, minPrice, maxPrice }) => {
        return fetch({
            method: 'POST',
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
            method: 'POST',
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
            jwtToken: token,
            route: apiPrefix.cart + '/all'
        });
    },

    // 4.2 Insert item
    addItemToCart: (token, productId, amount) => {
        return fetch({
            method: 'POST',
            reqBody: {
                productId,
                amount
            },
            jwtToken: token,
            route: apiPrefix.cart + '/insert'
        });
    },

    // 4.3 Update item
    updateItemToCart: (token, productId, amount) => {
        return fetch({
            method: 'POST',
            reqBody: {
                productId,
                amount
            },
            jwtToken: token,
            route: apiPrefix.cart + '/update'
        });
    },

    // 4.4 Delete item
    deleteItemToCart: (token, productId) => {
        return fetch({
            method: 'POST',
            reqBody: {
                productId,
            },
            jwtToken: token,
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
            },
            jwtToken: token,
            route: apiPrefix.checkout + '/order'
        });
    },

    // 5.2 Get all orders
    getAllOrders: (token) => {
        return fetch({
            method: 'GET',
            reqBody: {
            },
            jwtToken: token,
            route: apiPrefix.checkout + '/order/all'
        });
    },

    // 5.3 Get one order
    getOneOrder: (token, orderId) => {
        return fetch({
            method: 'GET',
            reqBody: {
                orderId
            },
            jwtToken: token,
            route: apiPrefix.checkout + '/order/one'
        });
    },


    /*
    *       SECTION 6: ADMIN
    */


    // 6.1 Get all accounts
    adminGetAllAccounts: (token, offset, limit, { keyword }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/account/all'
        });
    },

    // 6.2 Create account 
    adminCreateAccount: (token, { username, password, email, fullName, dateOfBirth, phone, gender, address, avatar, permission }) => {
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
                avatar,
                permission
            },
            jwtToken: token,
            route: apiPrefix.admin + '/account/create'
        });
    },

    // 6.3 Update account 
    adminUpdateAccount: (token, id, { username, password, email, fullName, dateOfBirth, phone, gender, address, avatar, permission, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                username,
                password,
                email,
                fullName,
                dateOfBirth,
                phone,
                gender,
                address,
                avatar,
                permission,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/account/update'
        });
    },

    // 6.4 Get all products
    adminGetAllProducts: (token, limit, offset, { keyword }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: { keyword }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/product/all'
        });
    },

    // 6.5 Insert product 
    adminInsertProduct: (token, { productName, industryId, branchId, categoryId, brandId, price, images, description, longDescription, amount }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                productName,
                industryId,
                branchId,
                categoryId,
                brandId,
                price,
                images,
                description,
                longDescription,
                amount
            },
            jwtToken: token,
            route: apiPrefix.admin + '/product/insert'
        });
    },

    // 6.6 Update product 
    adminUpdateProduct: (token, id, { productName, industryId, branchId, categoryId, brandId, price, images, description, longDescription, amount, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                productName,
                industryId,
                branchId,
                categoryId,
                brandId,
                price,
                images,
                description,
                longDescription,
                amount,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/product/update'
        });
    },

    // 6.7 Get all brands  
    adminGetAllBrands: (token, limit, offset, { keyword }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/brand/all'
        });
    },

    // 6.8 Insert brand
    adminInsertBrand: (token, { brandName }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                brandName
            },
            jwtToken: token,
            route: apiPrefix.admin + '/brand/insert'
        });
    },

    // 6.9 Update brand
    adminUpdateBrand: (token, id, { brandName, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                brandName,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/brand/update'
        });
    },

    // 6.10 Get all industries
    adminGetAllIndustries: (token, limit, offset, { keyword }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/industry/all'
        });
    },

    // 6.11 Insert  industry
    adminInsertIndustry: (token, { industryName }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                industryName
            },
            jwtToken: token,
            route: apiPrefix.admin + '/industry/insert'
        });
    },

    // 6.12 Update industry
    adminUpdateIndustry: (token, id, { industryName, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                industryName,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/industry/update'
        });
    },

    // 6.13 Get all Branches
    adminGetAllBranches: (token, limit, offset, { keyword }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/branch/all'
        });
    },

    // 6.14 Insert branch
    adminInsertBranch: (token, { branchName, industryId }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                branchName,
                industryId,
            },
            jwtToken: token,
            route: apiPrefix.admin + '/branch/insert'
        });
    },

    // 6.15 Update branch
    adminUpdateBranch: (token, id, { branchName, industryId, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                branchName,
                industryId,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/branch/update'
        });
    },

    // 6.16 Get all Categories
    adminGetAllCategories: (token, limit, offset, { keyword }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/category/all'
        });
    },

    // 6.17 Insert category
    adminInsertCategory: (token, { categoryName, industryId, branchId }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                categoryName,
                industryId,
                branchId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/category/insert'
        });
    },

    // 6.18 Update category
    adminUpdateCategory: (token, id, { categoryName, branchId, industryId, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                categoryName,
                industryId,
                branchId,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/category/update'
        });
    },

    // 6.19 Get all Campaigns
    adminGetAllCampaigns: (token, limit, offset, { keyword, startTime, expiredTime }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    keyword,
                    startTime,
                    expiredTime
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/campaign/all'
        });
    },

    // 6.20 Insert campaign
    adminInsertCampaign: (token, { campaignName, description, startTime, expiredTime }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                campaignName,
                description,
                startTime,
                expiredTime
            },
            jwtToken: token,
            route: apiPrefix.admin + '/campaign/insert'
        });
    },

    // 6.21 Update campaign
    adminUpdateCampaign: (token, id, { campaignName, description, startTime, expiredTime, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                id,
                campaignName,
                description,
                startTime,
                expiredTime,
                active
            },
            jwtToken: token,
            route: apiPrefix.admin + '/campaign/update'
        });
    },

    // 6.22 Get all Coupons
    adminGetAllCoupons: (token, limit, offset, { startTime, expiredTime }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    startTime,
                    expiredTime
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/coupon/all'
        });
    },

    // 6.23 Insert coupon
    adminInsertCoupon: (token, productsId, { campaignId, couponCode, percent, money, threshold, allProduct, amount }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                campaignId,
                couponCode,
                percent,
                money,
                threshold,
                allProduct,
                amount,
                productsId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/coupon/insert'
        });
    },

    // 6.24 Update coupon
    adminUpdateCoupon: (token, productsId, { campaignId, couponCode, percent, money, threshold, allProduct, amount, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                campaignId,
                couponCode,
                percent,
                money,
                threshold,
                allProduct,
                amount,
                active,
                productsId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/coupon/update'
        });
    },

    // 6.25 Get all discounts
    adminGetAllDiscounts: (token, limit, offset, { startTime, expiredTime }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    startTime,
                    expiredTime
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/discount/all'
        });
    },

    // 6.26 Insert discount
    adminInsertdiscount: (token, productsId, { percent, startTime, expiredTime }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                percent,
                startTime,
                expiredTime,
                productsId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/discount/insert'
        });
    },

    // 6.27 Update discount
    adminUpdatediscount: (token, productsId, { percent, startTime, expiredTime, active }) => {
        return fetch({
            method: 'POST',
            reqBody: {
                percent,
                startTime,
                expiredTime,
                active,
                productsId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/discount/update'
        });
    },

    // 6.28 Get all Orders
    adminGetAllOrders: (token, limit, offset, { startTime, expiredTime }) => {
        return fetch({
            method: 'GET',
            reqBody: {
                limit,
                offset,
                query: {
                    startTime,
                    expiredTime
                }
            },
            jwtToken: token,
            route: apiPrefix.admin + '/order/all'
        });
    },

    // 6.29 GET one order
    adminGetOrder: (token, orderId) => {
        return fetch({
            method: 'GET',
            reqBody: {
                orderId
            },
            jwtToken: token,
            route: apiPrefix.admin + '/order/one'
        });
    },

    // 6.30 Change order status
    admimChangeOrderStatus: (token, orderId, orderStatus) => {
        return fetch({
            method: 'POST',
            reqBody: {
                orderId,
                orderStatus
            },
            jwtToken: token,
            route: apiPrefix.admin + '/order/update'
        });
    },
}
