// import Types from './types';

const INITIAL_STATE = {
    CheckoutDetail: {
        cartItems: []
    },
}

const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        // case Types.TOGGLE_CART:
        //     return {
        //         ...state,
        //         CheckoutDetail: {

        //         }
        //     };

        default:
            return state;
    }
}

export default checkoutReducer;
