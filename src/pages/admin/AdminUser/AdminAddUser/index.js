import { connect } from 'react-redux';
import Actions from '../../duck/actions';
// import commonActions from '../../../common/duck/actions';
import AdminAddUser from './AdminAddUser';

const mapStateToProps = (state) => state.admin.AdminAddUser;
const mapDispatchToProps = (dispatch) => ({
    updateForm: (newFormObj) => {
        dispatch(Actions.updateAddUserForm(newFormObj));
    },

    // changeModalMode: (isUpdateMode, className) => {
    //     dispatch(commonActions.changeModalMode({
    //         isUpdateMode: isUpdateMode || false,
    //         submitClassName: className || 'btn-success'
    //     }));
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddUser);
