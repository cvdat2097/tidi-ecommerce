import Types from './types';
import commonTypes from '../../common/duck/types';
import { DEFAULT_FORMDATA } from '../../../config/constants';

const INITIAL_STATE = {
    AdminUser: {
        users: [],
    },

    AdminAddUser: {
        formData: {
            ...DEFAULT_FORMDATA.AdminAddUser
        }
    },

    AdminProduct: {
        products: []
    },

    AdminAddProduct: {
        formData: {
            ...DEFAULT_FORMDATA.AdminAddProduct
        }
    },

    AdminFilter: {
        currentPage: 1,
        totalItems: 0,
        pageSize: 10,
        query: {
            keyword: ''
        }
    },

    Admin: {

    },

    AdminNavBar: {

    }
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADMIN_UPDATE_FILTER:
            return {
                ...state,
                AdminFilter: {
                    ...state.AdminFilter,
                    query: {
                        ...state.AdminFilter.query,
                        ...action.payload
                    }
                }
            };

        case commonTypes.CHANGE_PAGE_INFO:
            return {
                ...state,
                AdminFilter: {
                    ...state.AdminFilter,
                    ...action.payload
                }
            };


        case Types.ADMIN_USER_UPDATE_FORM:
            return {
                ...state,
                AdminAddUser: {
                    formData: {
                        ...state.AdminAddUser.formData,
                        ...action.payload
                    }
                }
            };

        case Types.ADMIN_USER_FETCH_USERS:
            return {
                ...state,
                AdminUser: {
                    ...state.AdminUser,
                    users: action.payload
                }
            };

        case Types.ADMIN_PRODUCT_UPDATE_FORM:
            return {
                ...state,
                AdminAddProduct: {
                    formData: {
                        ...state.AdminAddProduct.formData,
                        ...action.payload
                    }
                }
            };

        case Types.ADMIN_PRODUCT_FETCH_PRODUCTS:
            return {
                ...state,
                AdminProduct: {
                    ...state.AdminProduct,
                    products: action.payload
                }
            };

        default:
            return state;
    }
}

export default adminReducer;
