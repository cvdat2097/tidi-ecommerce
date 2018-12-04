import Types from './types';

const fetchUsers = (payload) => ({
    type: Types.ADMIN_FETCH_USERS,
    payload
});

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_UPDATE_ADD_USER_FORM,
    payload
});

const updateUserKeyword = (payload) => ({
    type: Types.ADMIN_UPDATE_USER_KEYWORD,
    payload
});


export default {
    updateAddUserForm,
    updateUserKeyword,
    fetchUsers
};
