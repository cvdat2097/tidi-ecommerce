import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import LoadingBar from './LoadingBar';

const mapStateToProps = (state) => state.common.LoadingBar;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingBar);
