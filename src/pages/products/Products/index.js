import { connect } from 'react-redux';

import productsActions from '../duck/actions';
import commonActions from '../../common/duck/actions';

import Products from './Products';

const mapStateToProps = (state) => (state.products.Products);

const mapDispatchToProps = (dispatch) => ({
    updateProductList: (products) => {
        dispatch(productsActions.fetchProducts(products));
    },
    changePageInfo: (pageInfo) => {dispatch(commonActions.changePageInfo(pageInfo))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
