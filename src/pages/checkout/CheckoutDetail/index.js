import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import CheckoutDetail from './CheckoutDetail';

const mapStateToProps = (state) => state.checkout.CheckoutDetail;
const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDetail);
