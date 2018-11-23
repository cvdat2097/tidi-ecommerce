import { connect } from 'react-redux';
import Actions from '../duck/actions';
import AdminUser from './AdminUser';

const mapStateToProps = (state) => ({
    ...state.admin.AdminUser,
    ...state.admin.AdminAddUser
});

const mapDispatchToProps = (dispatch) => ({
    setFormData: (newData) => dispatch(Actions.updateAddUserForm(newData)),
    changePageInfo: (pageInfo) => dispatch(Actions.changePageInfo(pageInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
