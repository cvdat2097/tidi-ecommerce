import Types from './types';
import commonTypes from '../../common/duck/types';

const INITIAL_STATE = {
    Products: {
        products: [],
        currentPage: 1,
        pageSize: 12,
        totalItems: 0,
    },

    SearchPanel: {
        categories: [],
        branches: [],
        currentIndustryId: 0
    },

    ProductDetail: {

    }
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Types.FETCH_PRODUCTS:
            return {
                ...state,
                Products: {
                    ...state.Products,
                    products: action.payload
                }
            };

        case Types.FETCH_CATEGORIES:
            return {
                ...state,
                SearchPanel: {
                    ...state.SearchPanel,
                    categories: action.payload
                }
            };


        case Types.FETCH_BRANCHES:
            return {
                ...state,
                SearchPanel: {
                    ...state.SearchPanel,
                    currentIndustryId: action.payload
                }
            };


        case commonTypes.CHANGE_PAGE_INFO:
            return {
                ...state,
                Products: {
                    ...state.Products,
                    ...action.payload
                }
            };


        default:
            return state;
    }
}

export default productsReducer;
