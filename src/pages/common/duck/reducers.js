import Types from './types';

const INITIAL_STATE = {
    Cart: {
        isActive: false
    }
}

const commonReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.TOGGLE_CART:
            console.log(state);
            return {
                ...state,
                Cart: {
                    isActive: !state.Cart.isActive
                }
            };

        default:
            return state;
    }
}

export default commonReducer;
