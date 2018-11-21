// import Types from './types';

const INITIAL_STATE = {
    AdminUser: {
        isActive: false
    },

    Admin: {

    },

    AdminNavBar: {

    }
}

const adminReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case Types.TOGGLE_CART:
        //     return {
        //         ...state,
        //         Cart: {
        //             isActive: action.payload !== undefined ? action.payload : !state.Cart.isActive
        //         }
        //     };

        default:
            return state;
    }
}

export default adminReducer;
