// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../../duck/actions';
import AdminAddBrand from './AdminAddBrand';

const mapStateToProps = (state) => state.admin.AdminAddBrand;
const mapDispatchToProps = (dispatch) => ({
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddBrandForm(newFormObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddBrand);
