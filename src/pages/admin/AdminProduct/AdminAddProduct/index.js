// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../../duck/actions';
import AdminAddProduct from './AdminAddProduct';

const mapStateToProps = (state) => state.admin.AdminAddProduct;
const mapDispatchToProps = (dispatch) => ({
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddProductForm(newFormObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct);
