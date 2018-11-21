import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import AdminNavBar from './AdminNavBar';

const mapStateToProps = (state) => state.admin.AdminNavBar;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavBar);
