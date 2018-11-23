import Types from './types';

const INITIAL_STATE = {
    AdminUser: {
        isActive: false
    },

    Admin: {

    },

    AdminNavBar: {

    },

    AdminAddUser: {
        formData: {
            name: "abc",
            age: "1"
        }
    }
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.ADMIN_UPDATE_ADD_USER_FORM:
            return {
                ...state,
                AdminAddUser: {
                    // formData: action.payload,
                    formData: {
                        ...state.AdminAddUser.formData,
                        ...action.payload
                    }
                }
            };

        default:
            return state;
    }
}

export default adminReducer;
