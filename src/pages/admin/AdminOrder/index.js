import { connect } from 'react-redux';
import Actions from '../duck/actions';
import commonActions from '../../common/duck/actions';
import AdminOrder from './AdminOrder';

const mapStateToProps = (state) => ({
    ...state.admin.AdminOrder,
    ...state.admin.AdminAddOrder,
    ...state.admin.AdminFilter
});

const mapDispatchToProps = (dispatch) => ({
    setFormData: (newData) => dispatch(Actions.updateAddOrderForm(newData)),
    fetchOrders: (orders) => dispatch(Actions.fetchOrders(orders)),
    changePageInfo: (pageInfo) => dispatch(commonActions.changePageInfo(pageInfo)),
    updateFilter: (query) => dispatch(Actions.updateFilter(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrder);
