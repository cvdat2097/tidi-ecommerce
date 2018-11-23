import Types from './types';

const INITIAL_STATE = {
    AdminUser: {
        isActive: false,
        currentPage: 1,
        totalItems: 300,
        pageSize: 10
    },

    Admin: {

    },

    AdminNavBar: {

    },

    AdminAddUser: {
        formData: {
            username: 'abc',
            permission: 'admin',
            email: 'admin@vng.com.vn',
            full_name: 'Nguyen Van V',
            date_of_birth: '12/9/1878',
            phone: '09123889',
            gender: 'Nam',
            address: '78 VNG Streeet',
            is_verified: true
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

        case Types.CHANGE_PAGE_INFO:
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
