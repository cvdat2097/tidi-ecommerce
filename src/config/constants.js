export default {
    REST_SERVER: 'http://localhost:8080/api/v1',
    DATE_FORMAT: 'YYYY-MM-DD'
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
    CHECKED: 'CHECKED',
    PACKING: 'PACKING',
    SHIPPING: 'SHIPPING',
    CANCELED: 'CANCELED',
    SUCCESSFUL: 'SUCCESSFUL'
}

export const VERIFICATION_TYPE = {
    EMAIL: 'EMAIL',
    PASSWORD: 'PASSWORD'
}

export const DEFAULT_FORMDATA = {
    AdminAddUser: {
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
        productName: '',
        brandId: '',
        industryId: '',
        branchId: '',
        categoryId: '',
        price: 0,
        images: '',
        description: '',
        longDescription: '',
        amount: 0,
        active: ACTIVE_TYPE.TRUE,
    }
}

export const PAYMENT_METHOD = [
    {
        ID: 0,
        NAME: 'Zalo Pay',
        DESCRIPTION: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integ er bibendum sodales arcu id te mpus. Ut consectetur lacus.',
        SHIPPING_FEE: 0
    },
    {
        ID: 1,
        NAME: 'Ship COD',
        DESCRIPTION: 'Pay when deliver',
        SHIPPING_FEE: 19000
    },
];
