// External Dependecies
import { connect } from 'react-redux';

// Internal Dependencies
import LoadingBar from './LoadingBar';

const mapStateToProps = (state) => state.common.LoadingBar;

export default connect(mapStateToProps)(LoadingBar);
