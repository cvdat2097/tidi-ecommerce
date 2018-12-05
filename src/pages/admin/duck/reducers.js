import Types from './types';
import commonTypes from '../../common/duck/types';
import { DEFAULT_FORMDATA } from '../../../config/constants';

const INITIAL_STATE = {
    AdminUser: {
        users: [],
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

    },

    AdminAddUser: {
        formData: {
            ...DEFAULT_FORMDATA.AdminAddUser
        }
    }
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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


        case Types.ADMIN_USER_FETCH_USERS:
            return {
                ...state,
                AdminUser: {
                    ...state.AdminUser,
                    users: action.payload
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

        default:
            return state;
    }
}

export default adminReducer;
