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
    },

    Paginator: {
        currentPage: 3,
        totalItems: 300,
        pageSize: 10
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

        case Types.CHANGE_PAGE:
            return {
                ...state,
                Paginator: { ...state.Paginator, ...action.payload }
            };

        default:
            return state;
    }
}

export default commonReducer;
