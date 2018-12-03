import Types from './types';
import commonTypes from '../../common/duck/types';
import { USER_TYPE } from '../../../config/constants';

const INITIAL_STATE = {
    AdminUser: {
        isActive: false,
        currentPage: 1,
        totalItems: 0,
        pageSize: 3,
        users: []
    },

    Admin: {

    },

    AdminNavBar: {

    },

    AdminAddUser: {
        formData: {
            username: '',
            permission: USER_TYPE.PUBLIC,
            email: '',
            fullName: '',
            dateOfBirth: '',
            phone: '',
            gender: '',
            address: '',
            active: 'TRUE'
        }
    }
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADMIN_UPDATE_ADD_USER_FORM:
            return {
                ...state,
                AdminAddUser: {
                    formData: {
                        ...state.AdminAddUser.formData,
                        ...action.payload
                    }
                }
            };

        case Types.ADMIN_FETCH_USERS:
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
                AdminUser: {
                    ...state.AdminUser,
                    ...action.payload
                }
            };

        default:
            return state;
    }
}

export default adminReducer;
