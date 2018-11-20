import React from 'react';
import './Header.scss';

export default class Header extends React.Component {
    render() {
        console.log(this.props.openDropdownMenu);
        console.log(this.props.openMegaMenu);
        console.log(this.props.openMenuMobile);
        return (
            <header className="header_area">
                <div className="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
                    {/* <!-- Classy Menu --> */}
                    <nav className="classy-navbar" id="essenceNav">
                        {/* <!-- Logo --> */}
                        <a className="nav-brand" href="index.html"><img src="img/core-img/logo.png" alt="" /></a>
                        {/* <!-- Navbar Toggler --> */}
                        <div className="classy-navbar-toggler"
                            onClick={() => { this.props.toggleMenuMobile() }}
                        >
                            <span className="navbarToggler"><span></span><span></span><span></span></span>
                        </div>
                        {/* <!-- Menu --> */}
                        <div className={"classy-menu " + (this.props.openMenuMobile ? "menu-on" : "")}>
                            {/* <!-- close btn --> */}
                            <div className="classycloseIcon"
                                onClick={() => { this.props.toggleMenuMobile() }}
                            >
                                <div className="cross-wrap"><span className="top"></span><span className="bottom"></span></div>
                            </div>
                            {/* <!-- Nav Start --> */}
                            <div className="classynav">
                                <ul>
                                    <li
                                        onMouseOver={() => { this.props.toggleMegaMenu(true) }}
                                        onMouseLeave={() => { this.props.toggleMegaMenu(false) }}
                                    ><a href="/">Shop</a>
                                        <ul className={"dropdown-menu " + (this.props.openMegaMenu ? "show" : "")}
                                        >
                                            <div style={{ transitionDuration: '3s' }}>
                                                <span className="dropdown-header">Kid's Collection</span>
                                                <li className="dropdown-item"><a href="shop.html">Dresses</a></li>
                                                <li className="dropdown-item"><a href="shop.html">Shirts</a></li>
                                                <li className="dropdown-item"><a href="shop.html">T-shirts</a></li>
                                                <li className="dropdown-item"><a href="shop.html">Jackets</a></li>
                                                <li className="dropdown-item"><a href="shop.html">Trench</a></li>
                                                <li className="dropdown-item">
                                                    <div className="single-mega cn-col-4">
                                                        <img src="img/bg-img/bg-6.jpg" alt="" />
                                                    </div>
                                                </li>
                                            </div>
                                        </ul>
                                    </li>
                                    <li
                                        onMouseOver={() => {this.props.toggleDropdownMenu(true)}}
                                        onMouseLeave={() => {this.props.toggleDropdownMenu(false)}}
                                    ><a href="/">Pages</a>
                                        <ul
                                            className={"dropdown-menu " + (this.props.openDropdownMenu ? "show" : "")}
                                        >
                                            <li className="dropdown-item"><a href="index.html">Home</a></li>
                                            <li className="dropdown-item"><a href="shop.html">Shop</a></li>
                                            <li className="dropdown-item"><a href="single-product-details.html">Product Details</a></li>
                                            <li className="dropdown-item"><a href="checkout.html">Checkout</a></li>
                                            <li className="dropdown-item"><a href="blog.html">Blog</a></li>
                                            <li className="dropdown-item"><a href="single-blog.html">Single Blog</a></li>
                                            <li className="dropdown-item"><a href="regular-page.html">Regular Page</a></li>
                                            <li className="dropdown-item"><a href="contact.html">Contact</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="blog.html">Blog</a></li>
                                    <li><a href="contact.html">Contact</a></li>
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
                        {/* <!-- Favourite Area --> */}
                        <div className="favourite-area">
                            <a href="/"><img src="img/core-img/heart.svg" alt="" /></a>
                        </div>
                        {/* <!-- User Login Info --> */}
                        <div className="user-login-info">
                            <a href="/"><img src="img/core-img/user.svg" alt="" /></a>
                        </div>
                        {/* <!-- Cart Area --> */}
                        <div className="cart-area">
                            <div id="essenceCartBtn"
                                onClick={() => { this.props.toggleCart(true) }}
                            ><img src="img/core-img/bag.svg" alt="" /> <span>3</span></div>
                        </div>
                    </div>
                </div>
            </header >
        );
    }
}
