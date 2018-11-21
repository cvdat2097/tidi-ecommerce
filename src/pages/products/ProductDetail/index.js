import { connect } from 'react-redux';

// import productsActions from '../duck/actions';

import ProductDetail from './ProductDetail';

const mapStateToProps = (state) => (state.products.ProductDetail);

const mapDispatchToProps = (dispatch) => ({
   
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
