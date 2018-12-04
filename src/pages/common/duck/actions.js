import Types from './types';

const toggleCart = (payload) => ({
    type: Types.TOGGLE_CART,
    payload
});

const changePageInfo = (payload) => ({
    type: Types.CHANGE_PAGE_INFO,
    payload
});

const updateCartProduct = (payload) => ({
    type: Types.UPDATE_CART_PRODUCTS,
    payload
});

const updateAuthStatus = (payload) => ({
    type: Types.UPDATE_AUTH_STATUS,
    payload
});

const refreshCart = (payload) => ({
    type: Types.REFRESH_CART,
    payload
});

export default {
    toggleCart,
    changePageInfo,
    updateCartProduct,
    updateAuthStatus,
    refreshCart
};
