// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../../duck/actions';
import AdminAddUser from './AdminAddUser';

const mapStateToProps = (state) => state.admin.AdminAddUser;
const mapDispatchToProps = (dispatch) => ({
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddUserForm(newFormObj));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddUser);
