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

        case Types.CHANGE_MODAL_MODE:
            return {
                ...state,
                Modal: {
                    isUpdateMode: action.payload.isUpdateMode,
                    submitClassName: action.payload.submitClassName
                }
            };

        default:
            return state;
    }
}

export default commonReducer;
