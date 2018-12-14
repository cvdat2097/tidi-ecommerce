// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import commonActions from '../../common/duck/actions';

import ProductDetail from './ProductDetail';

const mapStateToProps = (state) => ({
    ...state.products.ProductDetail,
    cart: state.common.Cart
});

const mapDispatchToProps = (dispatch) => ({
    updateCartProducts: (products) => {
        dispatch(commonActions.updateCartProduct(products));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
