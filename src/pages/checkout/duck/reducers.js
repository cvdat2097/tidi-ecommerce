// import Types from './types';

const INITIAL_STATE = {
    CheckoutDetail: {
        cartItems: []
    },
}

const checkoutReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default checkoutReducer;
