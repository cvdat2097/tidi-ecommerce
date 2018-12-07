import { connect } from 'react-redux';

import Actions from '../duck/actions';

import Orders from './Orders';

const mapStateToProps = (state) => ({
    ...state.orders.Orders,
});

const mapDispatchToProps = (dispatch) => ({
    changePageInfo: (pageInfo) => { dispatch() },
    fetchOrders: (orders) => { dispatch(Actions.fetchOrders(orders)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
