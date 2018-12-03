import Types from './types';

const fetchUsers = (payload) => ({
    type: Types.ADMIN_FETCH_USERS,
    payload
});

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_UPDATE_ADD_USER_FORM,
    payload
});


export default {
    updateAddUserForm,
    fetchUsers
};
