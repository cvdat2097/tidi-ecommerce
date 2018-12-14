// External denpendencies
import { connect } from 'react-redux';

// Internal denpendencies
import Admin from './Admin';

const mapStateToProps = (state) => state.admin.Admin;

export default connect(mapStateToProps)(Admin);
