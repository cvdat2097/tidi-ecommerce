// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import Actions from '../duck/actions';
import commonActions from '../../common/duck/actions';
import AdminUser from './AdminUser';

const mapStateToProps = (state) => ({
    ...state.admin.AdminUser,
    ...state.admin.AdminAddUser,
    ...state.admin.AdminFilter
});

const mapDispatchToProps = (dispatch) => ({
    setFormData: (newData) => dispatch(Actions.updateAddUserForm(newData)),
    fetchUsers: (users) => dispatch(Actions.fetchUsers(users)),
    changePageInfo: (pageInfo) => dispatch(commonActions.changePageInfo(pageInfo)),
    updateFilter: (query) => dispatch(Actions.updateFilter(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
