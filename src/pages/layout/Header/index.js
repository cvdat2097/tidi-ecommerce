import { connect } from 'react-redux';
import Actions from '../../common/duck/actions';

import Header from './Header';

const mapStateToProps = (state) => state.layout.Header;
const mapDispatchToProps = (dispatch) => ({
    toggleCart: (open) => {
        dispatch(Actions.toggleCart(open));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
