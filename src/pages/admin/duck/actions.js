import Types from './types';

const fetchUsers = (payload) => ({
    type: Types.ADMIN_USER_FETCH_USERS,
    payload
});

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_USER_UPDATE_FORM,
    payload
});

const updateFilter = (payload) => ({
    type: Types.ADMIN_UPDATE_FILTER,
    payload
});


export default {
    updateAddUserForm,
    updateFilter,
    fetchUsers
};
