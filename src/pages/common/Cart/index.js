import { connect } from 'react-redux';
import Actions from '../duck/actions';
import Cart from './Cart';

const mapStateToProps = (state) => state.common.Cart;
const mapDispatchToProps = (dispatch) => ({
    toggleCart: (open) => {
        dispatch(Actions.toggleCart(open))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
