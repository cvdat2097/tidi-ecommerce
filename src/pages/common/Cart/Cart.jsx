import React from 'react';
import './Cart.scss';

export default class Cart extends React.Component {
    activeCart() {
        this.props.toggleCart();
        window.toggleCartNow = this.props.toggleCart;
    }

    render() {
        return (
            <div>
                {/* <!-- ##### Right Side Cart Area ##### --> */}
                <div
                    className={
                        "cart-bg-overlay " + (this.props.isActive ? 'cart-bg-overlay-on' : '')
                    }
                    onClick={() => { this.props.toggleCart(false) }}
                ></div>

                <div className={"right-side-cart-area " + (this.props.isActive ? 'cart-on' : '')}>
                    {/* <!-- Cart Button --> */}
                    <div className="cart-button"
                        onClick={() => { this.props.toggleCart(false) }}
                    >
                        <div id="rightSideCart"><img src="img/core-img/bag.svg" alt="" /> <span>3</span></div>
                    </div>

                    <div className="cart-content d-flex">

                        {/* <!-- Cart List Area --> */}
                        <div className="cart-list">
                            {/* <!-- Single Cart Item --> */}
                            <div className="single-cart-item">
                                <a href="/" className="product-image">
                                    <img src="img/product-img/product-1.jpg" className="cart-thumb" alt="" />
                                    {/* <!-- Cart Item Desc --> */}
                                    <div className="cart-item-desc">
                                        <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                                        <span className="badge">Mango</span>
                                        <h6>Button Through Strap Mini Dress</h6>
                                        <p className="size">Size: S</p>
                                        <p className="color">Color: Red</p>
                                        <p className="price">$45.00</p>
                                    </div>
                                </a>
                            </div>

                            {/* <!-- Single Cart Item --> */}
                            <div className="single-cart-item">
                                <a href="/" className="product-image">
                                    <img src="img/product-img/product-2.jpg" className="cart-thumb" alt="" />
                                    {/* <!-- Cart Item Desc --> */}
                                    <div className="cart-item-desc">
                                        <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                                        <span className="badge">Mango</span>
                                        <h6>Button Through Strap Mini Dress</h6>
                                        <p className="size">Size: S</p>
                                        <p className="color">Color: Red</p>
                                        <p className="price">$45.00</p>
                                    </div>
                                </a>
                            </div>

                            {/* <!-- Single Cart Item --> */}
                            <div className="single-cart-item">
                                <a href="/" className="product-image">
                                    <img src="img/product-img/product-3.jpg" className="cart-thumb" alt="" />
                                    {/* <!-- Cart Item Desc --> */}
                                    <div className="cart-item-desc">
                                        <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                                        <span className="badge">Mango</span>
                                        <h6>Button Through Strap Mini Dress</h6>
                                        <p className="size">Size: S</p>
                                        <p className="color">Color: Red</p>
                                        <p className="price">$45.00</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* <!-- Cart Summary --> */}
                        <div className="cart-amount-summary">

                            <h2>Summary</h2>
                            <ul className="summary-table">
                                <li><span>subtotal:</span> <span>$274.00</span></li>
                                <li><span>delivery:</span> <span>Free</span></li>
                                <li><span>discount:</span> <span>-15%</span></li>
                                <li><span>total:</span> <span>$232.00</span></li>
                            </ul>
                            <div className="checkout-btn mt-100">
                                <a href="checkout.html" className="btn essence-btn">check out</a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Right Side Cart End ##### --> */}
            </div>
        );
    }
}
