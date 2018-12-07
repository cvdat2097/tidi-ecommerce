import Types from './types';

const INITIAL_STATE = {
    Orders: {

    },

    OrderDetail: {

    }
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_ORDERS:
            return {
                ...state,
                Products: {
                    ...state.Products,
                    orders: action.payload
                }
            };

        default:
            return state;
    }
}

export default ordersReducer;
