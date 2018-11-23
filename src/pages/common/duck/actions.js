import Types from './types';

const toggleCart = (payload) => ({
    type: Types.TOGGLE_CART,
    payload
});

const changeModalMode = (payload) => ({
    type: Types.CHANGE_MODAL_MODE,
    payload
});

export default {
    toggleCart,
    changeModalMode
};
