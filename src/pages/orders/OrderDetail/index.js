import { connect } from 'react-redux';

import OrderDetails from './OrderDetail';

const mapStateToProps = (state) => ({
    ...state.orders.OrderDetails,
});

const mapDispatchToProps = (dispatch) => ({
    changePageInfo: (pageInfo) => { dispatch() },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
