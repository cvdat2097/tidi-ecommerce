import Types from './types';

// const toggleCart = (payload) => ({
//     type: Types.TOGGLE_CART,
//     payload
// });

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_UPDATE_ADD_USER_FORM,
    payload
});

export default {
    updateAddUserForm
};
