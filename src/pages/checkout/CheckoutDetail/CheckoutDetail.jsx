import React from 'react';
import './CheckoutDetail.scss';

import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
// import MockAPI from '../../../helpers/MockAPI';
import LIB, { withCommas } from '../../../helpers/lib';
import { PAYMENT_METHOD } from '../../../config/constants';
// import CONSTANT from '../../../config/constants';

const INITIAL_STATE = {
    fullname: '',
    address: '',
    phoneNumber: '',
    email: '',
    shippingNote: '',
    shippingFee: null,
    shippingMethod: {},

    fullnameIsInvalid: false,
    shippingMethodIsInvalid: false,
    errorMessage: ''
}


export default class CheckoutDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
        this.total = 0;

        this.generateCartItemList = this.generateCartItemList.bind(this);
        this.generatePaymentMethods = this.generatePaymentMethods.bind(this);
        this.handleShippingMethodSelect = this.handleShippingMethodSelect.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
    }

    componentWillMount() {
        this.fetchCartProducts();
        this.fetchUserInfo();
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

    async fetchUserInfo() {
        WebService.readAccountInfo(AuthService.getTokenUnsafe()).then(response => {
            let res = JSON.parse(response);

            if (res.status.status === 'TRUE') {
                this.setState({
                    fullname: res.fullName ? res.fullName : '',
                    address: res.address ? res.address : '',
                    phoneNumber: res.phone ? res.phone : '',
                    email: res.email ? res.email : '',
                });
            } else {
                console.err('Retrieve User info failed');
            }
        })
    }

    generateCartItemList() {
        let totalPrice = 0;
        let itemElements = this.props.cartItems.map((cartItem, index) => {
            let price = (cartItem.price - cartItem.price * cartItem.discPercent) * cartItem.amount;

            totalPrice += price;

            return (
                <li key={index} className="item-product-name">
                    <span>{`[${cartItem.amount}] ${cartItem.productName}`}</span>
                    <span>{`${withCommas(price)} ₫`}</span>
                </li>
            );
        });

        this.total = totalPrice;
        return itemElements;
    }

    handleShippingMethodSelect(method) {
        this.setState({
            shippingMethod: method,
            shippingFee: method.SHIPPING_FEE,
            shippingMethodIsInvalid: false,
            errorMessage: ''
        });
    }

    generatePaymentMethods() {
        return PAYMENT_METHOD.map((method, index) => (
            <PaymentMethod
                key={index}
                methodName={method.NAME}
                description={method.DESCRIPTION}
                fee={method.SHIPPING_FEE}
                handleOnSelect={() => this.handleShippingMethodSelect(method)}
                isSelected={method.NAME === this.state.shippingMethod.NAME}
            />
        ));
    }

    placeOrder() {
        if (!this.state.shippingMethod.NAME) {
            this.setState({
                shippingMethodIsInvalid: true,
                errorMessage: 'Please choose a shipping method'
            });
        } else {
            console.log(this.state);
            console.log(this.props.cartItems);
            this.setState(INITIAL_STATE)
        }
    }

    render() {
        return (
            <div>
                {/* <!-- ##### Breadcumb Area Start ##### --> */}
                <div className="breadcumb_area bg-img" style={{ backgroundImage: "url(/img/bg-img/breadcumb.jpg)" }}>
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12">
                                <div className="page-title text-center">
                                    <h2>Checkout</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Breadcumb Area End ##### --> */}

                {/* <!-- ##### Checkout Area Start ##### --> */}
                <div className="checkout_area section-padding-80">
                    <div className="container">
                        <div className="row">

                            <div className="col-12 col-md-6">
                                <div className="checkout_details_area mt-50 clearfix">

                                    <div className="cart-page-heading mb-30">
                                        <h5>Billing Address</h5>
                                    </div>

                                    <form action="#" method="post">
                                        <div className="row">
                                            <div className="col-md-12 mb-3">
                                                <label htmlFor="full_name">Fullname <span>*</span></label>
                                                <input type="text" className="form-control" id="full_name" required
                                                    value={this.state.fullname}
                                                    onChange={(e) => this.setState({ fullname: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="email_address">Email Address <span>*</span></label>
                                                <input type="email" className="form-control" id="email_address"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value })}
                                                />
                                            </div>
                                            {/* <div className="col-12 mb-3">
                                                <label htmlFor="country">Country <span>*</span></label>
                                                <select className="w-100 form-control" id="country">
                                                    <option value="usa">United States</option>
                                                    <option value="uk">United Kingdom</option>
                                                    <option value="ger">Germany</option>
                                                    <option value="fra">France</option>
                                                    <option value="ind">India</option>
                                                    <option value="aus">Australia</option>
                                                    <option value="bra">Brazil</option>
                                                    <option value="cana">Canada</option>
                                                </select>
                                            </div> */}
                                            <div className="col-12 mb-3">
                                                <label htmlFor="street_address">Address <span>*</span></label>
                                                <input type="text" className="form-control mb-3" id="street_address"
                                                    value={this.state.address}
                                                    onChange={(e) => this.setState({ address: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label htmlFor="phone_number">Phone No <span>*</span></label>
                                                <input type="number" className="form-control" id="phone_number" min="0"
                                                    value={this.state.phoneNumber}
                                                    onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="shipping_note">Note </label>
                                                <textarea className="form-control" id="shipping_note"
                                                    value={this.state.shippingNote}
                                                    onChange={(e) => this.setState({ shippingNote: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <div className="custom-control custom-checkbox d-block mb-2">
                                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                    <label className="custom-control-label" htmlFor="customCheck1">Terms and conitions</label>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-5 ml-lg-auto">
                                <div className="order-details-confirmation">
                                    {
                                        (this.props.cartItems && this.props.cartItems.length > 0) ?
                                            <>
                                                <div className="cart-page-heading">
                                                    <h5>Your Order</h5>
                                                    <p>The Details</p>
                                                </div>

                                                <ul className="order-details-form mb-4">
                                                    <li className="item-header"><span>Product</span> <span>Price</span></li>
                                                    {this.generateCartItemList()}
                                                    <li className="item-header"><span>Shipping</span> <span>{`${!this.state.shippingFee ? 'FREE' : withCommas(this.state.shippingFee)}`}</span></li>
                                                    <li className="total-header"><span>Total</span> <span>{`${withCommas(this.total + this.state.shippingFee)} ₫`}</span></li>
                                                </ul>

                                                <div id="accordion" role="tablist" className={"mb-4 form-control shipping-method-container" + (this.state.shippingMethodIsInvalid ? ' is-invalid' : '')}>
                                                    {this.generatePaymentMethods()}
                                                </div>
                                                <div className="error-message d-flex justicy-content-center">
                                                    {this.state.errorMessage}
                                                </div>
                                                <button className="btn essence-btn"
                                                    onClick={() => this.placeOrder()}
                                                >Place Order</button>
                                            </>
                                            : <div className="text-center">Cart is Empty!</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Checkout Area End ##### --> */}
            </div>
        );
    }
}

class PaymentMethod extends React.Component {
    render() {
        let collapseId = LIB.generateRandomString();
        return (
            <div className="card">
                <div className="card-header" role="tab" id="headingOne">
                    <h6 className="mb-0">
                        <a
                            className={'shipping-method-name ' + (this.props.isSelected ? 'shippingmethod-selected' : '')}
                            data-toggle="collapse" href={"#" + collapseId} aria-expanded="false" aria-controls={collapseId}
                            onClick={this.props.handleOnSelect}
                        ><i className={"fa mr-3" + (this.props.isSelected ? ' fa-check-square' : ' fa-square-o')}></i>{this.props.methodName}</a>
                    </h6>
                </div>

                <div id={collapseId} className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                        <p>{this.props.description}</p>
                        <p><b>FEE: </b>{withCommas(this.props.fee)} ₫</p>
                    </div>
                </div>
            </div>
        );
    }
}