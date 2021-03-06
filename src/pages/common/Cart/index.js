// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import Actions from '../duck/actions';
import Cart from './Cart';

const mapStateToProps = (state) => state.common.Cart;
const mapDispatchToProps = (dispatch) => ({
    toggleCart: (open) => {
        dispatch(Actions.toggleCart(open));
    },

    updateCartProducts: (products) => {
        dispatch(Actions.updateCartProduct(products));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
