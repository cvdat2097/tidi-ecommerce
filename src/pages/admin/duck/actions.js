import Types from './types';

const updateFilter = (payload) => ({
    type: Types.ADMIN_UPDATE_FILTER,
    payload
});

const fetchUsers = (payload) => ({
    type: Types.ADMIN_USER_FETCH_USERS,
    payload
});

const updateAddUserForm = (payload) => ({
    type: Types.ADMIN_USER_UPDATE_FORM,
    payload
});

const fetchProducts = (payload) => ({
    type: Types.ADMIN_PRODUCT_FETCH_PRODUCTS,
    payload
});

const updateAddProductForm = (payload) => ({
    type: Types.ADMIN_PRODUCT_UPDATE_FORM,
    payload
});

const updateAddBrandForm = (payload) => ({
    type: Types.ADMIN_BRAND_UPDATE_FORM,
    payload
});

const fetchOrders = (payload) => ({
    type: Types.ADMIN_ORDER_FETCH_ORDERS,
    payload
});

const updateOrderForm = (payload) => ({
    type: Types.ADMIN_ORDER_UPDATE_FORM,
    payload
});


export default {
    updateFilter,
    updateAddUserForm,
    fetchUsers,
    fetchProducts,
    updateAddProductForm,
    updateAddBrandForm,
    fetchOrders,
    updateOrderForm
};
