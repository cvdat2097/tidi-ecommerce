import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Header.scss';

import { ROUTE_NAME } from '../../../routes/main.routing';
import AuthService from '../../../services/AuthService';
import WebService from '../../../services/WebService';

const INITIAL_STATE = {
    openDropdownMenu: false,
    openMegaMenu: false,
    openMenuMobile: false,
    openCatalogDetail: false,
    activeMenuitemIndex: 0,
    redirectTo: null
}

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.generateMenuItems = this.generateMenuItems.bind(this);
        this.generateCatalog = this.generateCatalog.bind(this);
        this.handleHoverMenuItem = this.handleHoverMenuItem.bind(this);
    }

    componentDidMount() {
        this.fetchIndustries();
        // FIXME: retrieve isLoggedIn from RouteWithSubRoutes and delte this block
        // ============ START
        AuthService.isLoggedIn().then(status => {
            if (status.tokenIsValid) {
                this.props.changeLoginStatus(status.tokenIsValid);
            }
        });
        // ============ END
    }

    fetchIndustries() {
        WebService.getAllIndustries().then(idtrs => {
            let industries = JSON.parse(idtrs);
            this.props.fetchIndustries(industries);
            this.props.changeIndustryHover(industries[0]);
        });
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

    handleLogout() {
        AuthService.logout();
        this.props.changeLoginStatus(false);
        this.setState({
            redirectTo: <Redirect to={ROUTE_NAME.LOGIN} />
        });
    }

    generateCatalog() {
        const generateCategories = (categories) => {
            let R = [];

            if (categories) {
                categories.forEach((cat, index) => {
                    R.push(
                        <Link className="category-item" key={index} to="/">{cat.categoryName}</Link>
                    );
                });
            }

            return R;
        }

        const generateBranches = (branches) => {
            let R = [];

            if (branches) {
                branches.forEach((branch, index) => {
                    R.push(
                        <div key={index} className="branch-container">
                            <h6>{branch.branchName}</h6>
                            <div>
                                {generateCategories(branch.categories)}
                            </div>
                        </div>
                    );
                });
            }

            return R;
        }

        return generateBranches(this.props.currentIndustry.branches);
    }

    generateMenuItems() {
        let R = [];

        if (this.props.industries) {
            this.props.industries.forEach((industry, index) => {
                R.push(
                    <a key={index}
                        href="/"
                        className={"dropdown-item" + (this.state.activeMenuitemIndex === index ? " menuitem-active" : "")}
                        onMouseEnter={() => {
                            this.setState({
                                activeMenuitemIndex: index
                            });
                            this.handleHoverMenuItem(industry);
                        }}
                    >{industry.industryName}</a>
                );
            });
        }

        return R;
    }

    handleHoverMenuItem(industry) {
        this.props.changeIndustryHover(industry);
    }

    render() {
        return (
            <header className="header_area">
                {this.state.redirectTo}
                <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
                    {/* <!-- Classy Menu --> */}
                    <nav className="classy-navbar" id="essenceNav">
                        {/* <!-- Logo --> */}
                        <Link className="nav-brand" to={ROUTE_NAME.HOME}><img src="/img/core-img/logo.png" alt="" /></Link>
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
                                        <Link to={ROUTE_NAME.PRODUCTS}>Catalog</Link >
                                        <div className="catalog-container dropdown d-flex">
                                            <div className="menuitem-container">
                                                {this.generateMenuItems()}
                                            </div>

                                            {/* CATALOG DETAIL */}
                                            <div className="catalog-detail">
                                                {this.generateCatalog()}
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link to={{
                                        pathname: ROUTE_NAME.ADMIN.HOME,
                                        search: ''
                                    }}>Admin</Link></li>
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
                                <input type="search" name="search" id="headerSearch" placeholder="Type for search" autoComplete="off" />
                                <button type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                            </form>
                        </div>
                        {/* <!-- Cart Area --> */}
                        <div className="cart-area">
                            <div id="essenceCartBtn"
                                onClick={() => { this.props.toggleCart(true) }}
                            ><img src="/img/core-img/bag.svg" alt="" /> <span>{this.props.nCartItems}</span></div>
                        </div>
                        {/* <!-- Favourite Area --> */}
                        {
                            this.props.isLoggedIn
                                ?
                                <div className="favourite-area">
                                    <a href="/"><img src="/img/core-img/message.svg" alt="" /></a>
                                </div>
                                : null
                        }
                        {/* <!-- User Login Info --> */}
                        <div className="user-login-info d-flex justify-content-center align-items-center">
                            {
                                this.props.isLoggedIn
                                    ?
                                    <div className="favourite-area">
                                        <a href="/" className="dropdown dropdown-toggle loggedin-btn" data-toggle="dropdown">
                                            <img src="/img/core-img/user.svg" alt="" />
                                        </a>
                                        <div className="dropdown-menu">
                                            <span className="d-flex justify-content-center">Hello, {this.props.username}</span>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item text-center" >My Orders</button>
                                            <button className="dropdown-item text-center" >Settings</button>
                                            <button className="dropdown-item text-center" >Help</button>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item text-center"
                                                onClick={() => this.handleLogout()}
                                            >Log out</button>
                                        </div>
                                    </div>
                                    :
                                    <div className="user-login-button d-flex">
                                        <Link to={ROUTE_NAME.LOGIN} className="btn btn-outline-secondary text-center">Login</Link>
                                        <Link to={ROUTE_NAME.REGISTER} className="btn btn-outline-secondary">Register</Link>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </header >
        );
    }
}
