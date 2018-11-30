import Types from './types';

const INITIAL_STATE = {
    Cart: {
        isActive: false,
        products: []
    },

    Auth: {
    },

    Modal: {
        isUpdateMode: false,
        submitClassName: ''
    },

    Paginator: {

    },

    LoadingBar: {

    },

    AuthenticationStatus: {
        isLoggedIn: false,
    }
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.TOGGLE_CART:
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    isActive: action.payload !== undefined ? action.payload : !state.Cart.isActive
                }
            };

        case Types.UPDATE_CART_PRODUCTS:
            return {
                ...state,
                Cart: {
                    ...state.Cart,
                    products: action.payload
                }
            };

        case Types.UPDATE_AUTH_STATUS:
            return {
                ...state,
                AuthenticationStatus: {
                    ...state.AuthenticationStatus,
                    ...action.payload
                }
            };


        default:
            return state;
    }
}

export default commonReducer;
