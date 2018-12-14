// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import Actions from '../duck/actions';

import OrderDetails from './OrderDetail';

const mapStateToProps = (state) => ({
    ...state.orders.OrderDetail,
});

const mapDispatchToProps = (dispatch) => ({
    fetchOrderDetail: (order) => { dispatch(Actions.fetchOrderDetail(order)) },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
