import Types from './types';

const INITIAL_STATE = {
    Orders: {
        orders: []
    },

    OrderDetail: {
        order: {}
    }
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_ORDERS:
            return {
                ...state,
                Orders: {
                    ...state.Orders,
                    orders: action.payload
                }
            };
            
        case Types.FETCH_ORDER_DETAIL:
            return {
                ...state,
                OrderDetail: {
                    ...state.OrderDetail,
                    order: action.payload
                }
            };
        default:
            return state;
    }
}

export default ordersReducer;
