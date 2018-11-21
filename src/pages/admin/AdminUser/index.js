import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import AdminUser from './AdminUser';

const mapStateToProps = (state) => state.admin.AdminUser;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
