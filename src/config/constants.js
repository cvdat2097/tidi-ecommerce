export default {
    REST_SERVER: 'http://localhost:8080/api/v1/auth',
    ROUTE: {
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
    },

    USER_TYPE: {
        ADMIN: 'ADMIN',
        CUSTOMER: 'CUSTOMER'
    },

    VERIFICATION_TYPE: {
        EMAIL: 'EMAIL',
        PASSWORD: 'PASSWORD'
    },

    ORDER_STATUS: {
        CHECKED: 'CHECKED',
        PACKING: 'PACKING',
        SHIPPING: 'SHIPPING',
        CANCELED: 'CANCELED',
        SUCCESSFUL: 'SUCCESSFUL'
    }
}
