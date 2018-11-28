import { connect } from 'react-redux';
import commonActions from '../../common/duck/actions';
import layoutActions from '../../layout/duck/actions';

import Header from './Header';

const mapStateToProps = (state) => ({
    ...state.layout.Header,
    ...state.common.Auth,
    nCartItems: state.common.Cart.products.length
});

const mapDispatchToProps = (dispatch) => ({
    toggleCart: (open) => {
        dispatch(commonActions.toggleCart(open));
    },

    toggleDropdownMenu: (open) => {
        dispatch(layoutActions.openDropdownMenu(open));
    },

    toggleMegaMenu: (open) => {
        dispatch(layoutActions.openMegaMenu(open));
    },

    toggleMenuMobile: () => {
        dispatch(layoutActions.openMenuMobile());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
