import { connect } from 'react-redux';

import Orders from './Orders';

const mapStateToProps = (state) => ({
    ...state.orders.Orders,
});

const mapDispatchToProps = (dispatch) => ({
    changePageInfo: (pageInfo) => { dispatch() },
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
