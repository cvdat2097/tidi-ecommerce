import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import Admin from './Admin';

const mapStateToProps = (state) => state.admin.Admin;
const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
