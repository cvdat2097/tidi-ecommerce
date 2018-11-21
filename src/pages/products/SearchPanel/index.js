import { connect } from 'react-redux';

import productsActions from '../duck/actions';

import SearchPanel from './SearchPanel';

const mapStateToProps = (state) => (state.products.SearchPanel);

const mapDispatchToProps = (dispatch) => ({
    updateCategoryList: (list) => {
        dispatch(productsActions.updateCategoryList(list));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
