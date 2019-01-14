// External Dependencies
import { connect } from 'react-redux';

// Internal Dependencies
import commonActions from '../../common/duck/actions';
import layoutActions from '../../layout/duck/actions';
import Header from './Header';

const mapStateToProps = (state) => ({
    ...state.layout.Header,
    ...state.common.AuthenticationStatus,
    nCartItems: state.common.Cart.products.length > 0 ? state.common.Cart.products.reduce((nitem, item) => nitem + item.amount, 0) : 0
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
    },

    fetchIndustries: (industries) => {
        dispatch(layoutActions.fetchIndustries(industries));
    },

    changeIndustryHover: (industry) => {
        dispatch(layoutActions.switchIndustryHover(industry));
    },

    changeLoginStatus: (status) => {
        dispatch(commonActions.updateAuthStatus({
            isLoggedIn: status
        }));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
