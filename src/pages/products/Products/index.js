// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import productsActions from '../duck/actions';
import commonActions from '../../common/duck/actions';

import Products from './Products';

const mapStateToProps = (state) => ({
    ...state.products.Products,
    cart: state.common.Cart
});

const mapDispatchToProps = (dispatch) => ({
    updateProductList: (products) => {
        dispatch(productsActions.fetchProducts(products));
    },
    changePageInfo: (pageInfo) => { dispatch(commonActions.changePageInfo(pageInfo)) },
    updateCartProducts: (products) => {
        dispatch(commonActions.updateCartProduct(products));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
