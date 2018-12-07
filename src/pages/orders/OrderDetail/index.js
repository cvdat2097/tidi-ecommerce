import { connect } from 'react-redux';

import Actions from '../duck/actions';

import OrderDetails from './OrderDetail';

const mapStateToProps = (state) => ({
    ...state.orders.OrderDetail,
});

const mapDispatchToProps = (dispatch) => ({
    changePageInfo: (pageInfo) => { dispatch() },
    fetchOrderDetail: (order) => { dispatch(Actions.fetchOrderDetail(order)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
