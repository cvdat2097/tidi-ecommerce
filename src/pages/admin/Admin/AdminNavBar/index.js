// External dependencies
import { connect } from 'react-redux';

// Internal dependencies
import AdminNavBar from './AdminNavBar';

const mapStateToProps = (state) => state.admin.AdminNavBar;

export default connect(mapStateToProps)(AdminNavBar);
