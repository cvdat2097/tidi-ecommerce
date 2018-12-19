// External Dependencies
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Intenal Dependencies
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchPanel));
