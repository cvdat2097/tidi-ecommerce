import { connect } from 'react-redux';
import Actions from '../../duck/actions';
// import commonActions from '../../../common/duck/actions';
import AdminAddProduct from './AdminAddProduct';

const mapStateToProps = (state) => state.admin.AdminAddProduct;
const mapDispatchToProps = (dispatch) => ({
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddProductForm(newFormObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct);
