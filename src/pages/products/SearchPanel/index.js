import { connect } from 'react-redux';

import productsActions from '../duck/actions';

import SearchPanel from './SearchPanel';

const mapStateToProps = (state) => ({
    ...state.products.SearchPanel,
    industries: state.layout.Header.industries
});

const mapDispatchToProps = (dispatch) => ({
    updateCategoryList: (list) => {
        dispatch(productsActions.updateCategoryList(list));
    },

    updateBranches: (industrId) => {
        dispatch(productsActions.fetchBranches(industrId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);
