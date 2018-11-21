import Types from './types';

const INITIAL_STATE = {
    Products: {
        products: []
    },

    SearchPanel: {
        categories: []
    }
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            return {
                ...state,
                Products: {
                    products: action.payload
                }
            };

        case Types.FETCH_CATEGORIES:
            return {
                ...state,
                SearchPanel: {
                    categories: action.payload
                }
            };

        default:
            return state;
    }
}

export default productsReducer;
