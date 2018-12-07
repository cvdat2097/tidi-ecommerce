import Types from './types';

const fetchOrders = (orders) => ({
    type: Types.FETCH_ORDERS,
    payload: orders
});

const fetchOrderDetail = (order) => ({
    type: Types.FETCH_ORDER_DETAIL,
    payload: order
});

export default {
    fetchOrders,
    fetchOrderDetail
};
