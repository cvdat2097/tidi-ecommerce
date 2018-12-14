// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import Modal from './Modal';

const mapStateToProps = (state) => state.common.Modal;

export default connect(mapStateToProps)(Modal);
