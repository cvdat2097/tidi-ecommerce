import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

import CONSTANT from '../../../config/constants';

const INITIAL_STATE = {
    openDropdownMenu: false,
    openMegaMenu: false,
    openMenuMobile: false,
    openCatalogDetail: false
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    toggleMegaMenu(open) {
        this.setState({
            openMegaMenu: open !== undefined ? open : !this.state.openMegaMenu
        });
    }

    toggleDropdownMenu(open) {
        this.setState({
            openDropdownMenu: open !== undefined ? open : !this.state.openDropdownMenu
        });
    }

    toggleMenuMobile(open) {
        this.setState({
            openMenuMobile: open !== undefined ? open : !this.state.openMenuMobile
        });
    }

    toggleCatalogDetail(open) {
        this.setState({
            openCatalogDetail: open !== undefined ? open : !this.state.openCatalogDetail
        });
    }

    render() {
        return (
            <header className="header_area">
                <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
                    {/* <!-- Classy Menu --> */}
                    <nav className="classy-navbar" id="essenceNav">
                        {/* <!-- Logo --> */}
                        <Link className="nav-brand" to={CONSTANT.ROUTE.HOME}><img src="img/core-img/logo.png" alt="" /></Link>
                        {/* <!-- Navbar Toggler --> */}
                        <div className="classy-navbar-toggler"
                            onClick={() => { this.toggleMenuMobile() }}
                        >
                            <span className="navbarToggler"><span></span><span></span><span></span></span>
                        </div>
                        {/* <!-- Menu --> */}
                        <div className={"classy-menu " + (this.state.openMenuMobile ? "menu-on" : "")}>
                            {/* <!-- close btn --> */}
                            <div className="classycloseIcon"
                                onClick={() => { this.toggleMenuMobile() }}
                            >
                                <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                            </div>
                            {/* <!-- Nav Start --> */}
                            <div className="classynav">
                                <ul>
                                    <li id="menuitem-catalog">
                                        <Link to={CONSTANT.ROUTE.PRODUCTS}>Catalog</Link >
                                        <div className="catalog-container dropdown d-flex">
                                            <div className="menuitem-container">
                                                <a className="dropdown-item" href="/">Product list</a>
                                                <a className="dropdown-item" href="/">Product list</a>
                                                <a className="dropdown-item" href="/">Product list</a>
                                                <a className="dropdown-item" href="/">Product list</a>
                                                <a className="dropdown-item" href="/">Product list</a>
                                                <a className="dropdown-item" href="/">Product list</a>
                                            </div>

                                            {/* CATALOG DETAIL */}
                                            <div className="catalog-detail">
                                                Branches and categories go here
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link to={CONSTANT.ROUTE.ADMIN.HOME}>Admin</Link></li>
                                </ul>
                            </div>
                            {/* <!-- Nav End --> */}
                        </div>
                    </nav>

                    {/* <!-- Header Meta Data --> */}
                    <div className="header-meta d-flex clearfix justify-content-end">
                        {/* <!-- Search Area --> */}
                        <div className="search-area">
                            <form action="#" method="post">
                                <input type="search" name="search" id="headerSearch" placeholder="Type for search" />
                                <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </form>
                        </div>
                        {/* <!-- Cart Area --> */}
                        <div className="cart-area">
                            <div id="essenceCartBtn"
                                onClick={() => { this.props.toggleCart(true) }}
                            ><img src="img/core-img/bag.svg" alt="" /> <span>{this.props.nCartItems}</span></div>
                        </div>
                        {/* <!-- Favourite Area --> */}
                        {
                            this.props.isLoggedIn
                                ?
                                <div className="favourite-area">
                                    <a href="/"><img src="img/core-img/heart.svg" alt="" /></a>
                                </div>
                                : null
                        }
                        {/* <!-- User Login Info --> */}
                        <div className="user-login-info">
                            {
                                this.props.isLoggedIn
                                    ?
                                    <a href="/"><img src="img/core-img/user.svg" alt="" /></a>
                                    :
                                    <div className="user-login-button">
                                        <Link to={CONSTANT.ROUTE.LOGIN} className="btn btn-outline-secondary">Login</Link>
                                        <Link to={CONSTANT.ROUTE.REGISTER} className="btn btn-outline-secondary">Register</Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </header >
        );
    }
}
