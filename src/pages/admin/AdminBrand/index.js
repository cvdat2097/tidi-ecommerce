// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../duck/actions';
import commonActions from '../../common/duck/actions';
import AdminBrand from './AdminBrand';

const mapStateToProps = (state) => ({
    ...state.admin.AdminBrand,
    ...state.admin.AdminAddBrand,
    ...state.admin.AdminFilter
});

const mapDispatchToProps = (dispatch) => ({
    setFormData: (newData) => dispatch(Actions.updateAddBrandForm(newData)),
    fetchBrands: (brands) => dispatch(Actions.fetchBrands(brands)),
    changePageInfo: (pageInfo) => dispatch(commonActions.changePageInfo(pageInfo)),
    updateFilter: (query) => dispatch(Actions.updateFilter(query)),
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddBrandForm(newFormObj));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminBrand);
