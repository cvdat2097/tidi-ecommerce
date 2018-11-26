import Types from './types';

const toggleCart = (payload) => ({
    type: Types.TOGGLE_CART,
    payload
});

const changePageInfo = (payload) => ({
    type: Types.CHANGE_PAGE_INFO,
    payload
});

export default {
    toggleCart,
    changePageInfo
};
