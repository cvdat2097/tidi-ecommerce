import Types from './types';

const INITIAL_STATE = {
    Products: {
        products: false
    }
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            return {
                ...state,
                Products: {
                    products: action.payload.products
                }
            };

        default:
            return state;
    }
}

export default productsReducer;
