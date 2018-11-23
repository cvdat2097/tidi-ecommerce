import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import Modal from './Modal';

const mapStateToProps = (state) => state.common.Modal;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
