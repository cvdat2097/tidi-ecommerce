import Types from './types';

// const toggleCart = (payload) => ({
//     type: Types.TOGGLE_CART,
//     payload
// });

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_UPDATE_ADD_USER_FORM,
    payload
});

const changePageInfo = (payload) => ({
    type: Types.CHANGE_PAGE_INFO,
    payload
});

export default {
    updateAddUserForm,
    changePageInfo
};
