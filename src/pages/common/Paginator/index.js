// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import Actions from '../duck/actions';
import Paginator from './Paginator';

const mapStateToProps = (state) => state.common.Paginator;
const mapDispatchToProps = (dispatch) => ({
    updatePaginatorInfo: (payload) => {
        dispatch(Actions.changePage(payload));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Paginator);
