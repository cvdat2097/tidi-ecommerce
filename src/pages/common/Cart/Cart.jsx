import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';


import { ROUTE_NAME } from '../../../routes/main.routing';
import { withCommas, showAlert } from '../../../helpers/lib';
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';


export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.total = 0;

        this.generateProductBoxes = this.generateProductBoxes.bind(this);
        this.generateCartItemNames = this.generateCartItemNames.bind(this);
        this.handleProductRemove = this.handleProductRemove.bind(this);
        this.fetchCartProducts = this.fetchCartProducts.bind(this);
    }

    componentDidMount() {
        this.fetchCartProducts();
    }

    fetchCartProducts() {
        if (this.props.isLoggedIn) {
            WebService.getCart(AuthService.getTokenUnsafe()).then(res => {
                // MockAPI.CART.getCart().then(res => {
                const result = JSON.parse(res);

                if (result.status.status === 'TRUE') {
                    if (result.products) {
                        result.products.forEach(prd => prd.images = JSON.parse(prd.images));
                    }
                    this.props.updateCartProducts(result.products);
                }
            });
        }
    }

    handleProductRemove(product) {
        if (product.id) {
            WebService.deleteItemFromCart(AuthService.getTokenUnsafe(), product.id).then(r => {
                const res = JSON.parse(r);

                if (res.status === 'TRUE') {
                    showAlert(`Removed ${product.productName}`)
                    this.fetchCartProducts();
                }
            })
        }
    }

    generateProductBoxes() {
        let R = [];

        if (this.props.products) {
            this.props.products.forEach((cartItem, index) => {
                R.push(
                    <div key={index} className="single-cart-item" >
                        <span className="product-remove"
                            onClick={() => this.handleProductRemove(cartItem)}
                        ><i className="fa fa-close" aria-hidden="true"></i></span>
                        <Link replace to={{
                            pathname: ROUTE_NAME.PRODUCT_DETAIL + '/' + cartItem.id,
                            search: ''
                        }} className="product-image"
                        >
                            <img src={cartItem.images[0]} className="cart-thumb" alt=""
                                onClick={() => { this.props.toggleCart(false) }}
                            />
                            {/* <!-- Cart Item Desc --> */}
                            <div className="cart-item-desc">

                                <span className="badge">{cartItem.category.categoryName}</span>
                                <h6>{cartItem.productName}</h6>
                                <span className="badge">{'X' + cartItem.amount}</span>
                                <p className="price">{withCommas(cartItem.price) + ' ₫'}</p>
                            </div>
                        </Link>
                    </div >
                );
            });
        }

        return R;
    }

    generateCartItemNames() {
        let R = [];
        let total = 0;

        if (this.props.products) {
            this.props.products.forEach((cartItem, index) => {
                let itemPrice = (cartItem.price - cartItem.price * cartItem.discPercent) * cartItem.amount;

                R.push(
                    <li key={index} className="cart-item-name">{cartItem.productName} x {cartItem.amount}<span></span><span>{withCommas(itemPrice)} ₫</span></li>
                );

                total += itemPrice;
            });
        }

        this.total = total;

        return R;
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
                        <div id="rightSideCart">
                            <img src="/img/core-img/cancel.svg" alt="Close" draggable="false" />
                        </div>
                    </div>

                    <div className="cart-content d-flex">
                        {/* EMPTY CART ICON */}
                        {
                            (!this.props.products || this.props.products.length === 0) &&
                            <div className="empty-cart">
                                <img src="/img/core-img/emptycart.png" alt="" draggable="false" />
                                <h2>Your cart is empty!</h2>
                            </div>
                        }

                        {/* <!-- Cart List Area --> */}
                        {
                            this.props.products && this.props.products.length > 0 &&
                            < div className="cart-list">
                                {this.generateProductBoxes()}
                            </div>
                        }

                        {/* <!-- Cart Summary --> */}
                        {
                            this.props.products && this.props.products.length > 0 &&
                            <div className="cart-amount-summary">

                                <h2>Summary</h2>
                                <ul className="summary-table">
                                    {this.generateCartItemNames()}
                                    <li className="summary-header"><span>total:</span> <span>{withCommas(this.total)} ₫</span></li>
                                </ul>
                                <div className="checkout-btn mt-100"
                                    onClick={() => { this.props.toggleCart(false) }}
                                >
                                    <Link to={ROUTE_NAME.CHECKOUT} className="btn essence-btn">check out</Link>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {/* <!-- ##### Right Side Cart End ##### --> */}
            </div >
        );
    }
}
