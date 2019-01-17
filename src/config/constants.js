export default {
    // REST_SERVER: 'http://localhost:8080/api/v1',
    REST_SERVER: 'http://tidi-binpossible49.c9users.io:8080/api/v1',
    DATE_FORMAT: 'YYYY-MM-DD',
    APPID: 12606
}


export const QUERY_PARAMS = {
    keyword: 'q',
    industryId: 'ind',
    branchId: 'brch',
    categoryId: 'cat',
    brandId: 'brd',
    minPrice: 'pfrom',
    maxPrice: 'pto'
}


export const ACTIVE_TYPE = {
    TRUE: 'TRUE',
    FALSE: 'FALSE'
}

export const USER_TYPE = {
    ADMIN: 'ADMIN',
    CUSTOMER: 'CUSTOMER',
    PUBLIC: 'PUBLIC'
}

export const USER_GENDER = {
    MALE: 'MALE',
    FEMALE: 'FEMALE'
}

export const ORDER_STATUS = {
    PENDING: 'PENDING',
    CHECKED: 'CHECKED',
    PACKING: 'PACKING',
    SHIPPING: 'SHIPPING',
    CANCELED: 'CANCELED',
    SUCCESSFUL: 'SUCCESSFUL',
    PAID: 'PAID'
}

// export const ORDER_STATUS = {
//     PENDING: 'PENDING',
//     PAID: 'PAID',
//     SHIPPING: 'SHIPPING',
//     CANCELED: 'CANCELED',
//     SUCCESSFUL: 'SUCCESSFUL'
// }

export const VERIFICATION_TYPE = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD'
}

export const DEFAULT_FORMDATA = {
    AdminAddUser: {
        id: '',
        username: '',
        permission: USER_TYPE.CUSTOMER,
        email: '',
        fullName: '',
        dateOfBirth: '',
        phone: '',
        gender: USER_GENDER.MALE,
        address: '',
        active: ACTIVE_TYPE.TRUE,
        password: ''
    },

    AdminAddProduct: {
        id: '',
        productName: '',
        brandId: 1,
        industryId: 1,
        branchId: 1,
        categoryId: 1,
        price: 0,
        images: '["https://www.twsf.com.tw/taipei/images/default.jpg"]',
        description: '',
        amount: 0,
        active: ACTIVE_TYPE.TRUE,
    },

    AdminAddBrand: {
        id: '',
        brandName: ''
    }
}

export const PAYMENT_METHOD = [{
        ID: 0,
        NAME: 'ZaloPay',
        DESCRIPTION: 'FREE and PROFESSIONL payment method',
        SHIPPING_FEE: 0
    },
    {
        ID: 1,
        NAME: 'Ship COD',
        DESCRIPTION: 'Pay when deliver',
        SHIPPING_FEE: 19000
    },
];

export const ZP_ORDER_STATUS = {
    PROCESSING: 'PROCESSING',
    CANCELED: 'CANCELED',
    SUCCESSFUL: 'SUCCESSFUL'
}