import Types from './types';

const toggleCart = (payload) => ({
    type: Types.TOGGLE_CART,
    payload
});

const changePage = (payload) => ({
    type: Types.CHANGE_PAGE,
    payload
});

export default {
    toggleCart,
    changePage
};
