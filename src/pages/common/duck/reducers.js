import Types from './types';

const INITIAL_STATE = {
    Cart: {
        isActive: false
    }
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.TOGGLE_CART:
            return {
                ...state,
                Cart: {
                    isActive: action.payload ? action.payload : !state.Cart.isActive
                }
            };

        default:
            return state;
    }
}

export default commonReducer;
