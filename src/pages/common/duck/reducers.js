import Types from './types';

const INITIAL_STATE = {
    Cart: {
        isActive: false
    },

    Auth: {
        isLoggedIn: false
    },

    Modal: {
        isUpdateMode: false,
        submitClassName: ''
    },

    Paginator: {

    },

    LoadingBar: {

    }
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.TOGGLE_CART:
            return {
                ...state,
                Cart: {
                    isActive: action.payload !== undefined ? action.payload : !state.Cart.isActive
                }
            };

        default:
            return state;
    }
}

export default commonReducer;
