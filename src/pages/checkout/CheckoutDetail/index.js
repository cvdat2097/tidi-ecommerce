import { connect } from 'react-redux';
// import Actions from '../duck/actions';
import commonActions from '../../common/duck/actions';
import CheckoutDetail from './CheckoutDetail';

const mapStateToProps = (state) => {
    return ({
        ...state.checkout.CheckoutDetail,
        cartItems: state.common.Cart.products
    });
}

const mapDispatchToProps = (dispatch) => ({
    updateCartProducts: (products) => {
        dispatch(commonActions.updateCartProduct(products));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDetail);
