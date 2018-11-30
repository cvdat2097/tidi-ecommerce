import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.scss';


import {ROUTE_NAME} from '../../../routes/main.routing';
import MockAPI from '../../../helpers/MockAPI';


export default class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.total = 0;

        this.generateProductBoxes = this.generateProductBoxes.bind(this);
        this.generateCartItemNames = this.generateCartItemNames.bind(this);
    }

    componentDidMount() {
        this.fetchCartProducts();
    }

    fetchCartProducts() {
        MockAPI.CART.getCart().then(res => {
            const cart = JSON.parse(res);

            this.props.updateCartProducts(cart);
        });
    }

    generateProductBoxes() {
        let R = [];

        if (this.props.products) {
            this.props.products.forEach((cartItem, index) => {
                R.push(
                    <div key={index} className="single-cart-item" >
                        <Link to={ROUTE_NAME.PRODUCT_DETAIL + '/' + cartItem.product.id} className="product-image"
                            onClick={() => { this.props.toggleCart(false) }}
                        >
                            <img src={cartItem.product.images[0]} className="cart-thumb" alt="" />
                            {/* <!-- Cart Item Desc --> */}
                            <div className="cart-item-desc">
                                <span className="product-remove"><i className="fa fa-close" aria-hidden="true"></i></span>
                                <span className="badge">{cartItem.product.category.categoryName}</span>
                                <h6>{cartItem.product.productName}</h6>
                                <span className="badge">{'X' + cartItem.amount}</span>
                                <p className="price">{cartItem.product.price + ' VND'}</p>
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
                let itemPrice = cartItem.product.price - cartItem.product.price * cartItem.product.discPercent;

                R.push(
                    <li key={index} className="cart-item-name">{cartItem.product.productName} x {cartItem.amount}<span></span><span>{itemPrice}</span></li>
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
                        <div id="rightSideCart"><img src="img/core-img/bag.svg" alt="" /> <span>{this.props.products.length}</span></div>
                    </div>

                    <div className="cart-content d-flex">

                        {/* <!-- Cart List Area --> */}
                        <div className="cart-list">
                            {this.generateProductBoxes()}
                        </div>

                        {/* <!-- Cart Summary --> */}
                        <div className="cart-amount-summary">

                            <h2>Summary</h2>
                            <ul className="summary-table">
                                {this.generateCartItemNames()}
                                <li className="summary-header"><span>total:</span> <span>{this.total}</span></li>
                            </ul>
                            <div className="checkout-btn mt-100"
                                onClick={() => { this.props.toggleCart(false) }}
                            >
                                <Link to={ROUTE_NAME.CHECKOUT} className="btn essence-btn">check out</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Right Side Cart End ##### --> */}
            </div>
        );
    }
}
