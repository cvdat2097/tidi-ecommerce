// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../duck/actions';
import commonActions from '../../common/duck/actions';
import AdminProduct from './AdminProduct';

const mapStateToProps = (state) => ({
    ...state.admin.AdminProduct,
    ...state.admin.AdminAddProduct,
    ...state.admin.AdminFilter
});

const mapDispatchToProps = (dispatch) => ({
    setFormData: (newData) => dispatch(Actions.updateAddProductForm(newData)),
    fetchProducts: (users) => dispatch(Actions.fetchProducts(users)),
    changePageInfo: (pageInfo) => dispatch(commonActions.changePageInfo(pageInfo)),
    updateFilter: (query) => dispatch(Actions.updateFilter(query)),
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddProductForm(newFormObj));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);
