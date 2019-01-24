// Stylesheet
import './CheckoutDetail.scss';

// External dependencies
import React from 'react';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import QRCode from 'qrcode';

// Internal Dependencies
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
import CONSTANT, { PAYMENT_METHOD, ACTIVE_TYPE, ZP_ORDER_STATUS } from '../../../config/constants';
import { ROUTE_NAME } from '../../../routes/main.routing';
import LIB, { withCommas } from '../../../helpers/lib';

import FormInput from '../../common/FormInput';

const INITIAL_STATE = {
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
    shippingNote: '',
    shippingFee: null,
    shippingMethod: {},
    couponCode: '',

    fullNameIsInvalid: false,
    shippingMethodIsInvalid: false,
    emailIsInvalid: false,
    addressIsInvalid: false,
    phoneNumberIsInvalid: false,
    errorMessage: '',
    couponMessage: '',
    couponStatusCode: null,
    couponDiscPercent: 0,
    couponMoney: 0,
    redirectTo: null
}

const INTERNAL_CONFIG = {
    INTERVAL_DURATION: 1000,
    SWAL_TIMEOUT: 10000
}


class CheckoutDetail extends React.Component {
    static propTypes = {
        isLoggedIn: PropTypes.bool,
        isSelected: PropTypes.bool,
        cartItems: PropTypes.array,
        updateCartProducts: PropTypes.func,
        handleOnSelect: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
        this.total = 0;
        this.discountTotal = 0;
        this.zalopayOrderId = null;
        this.zptranstoken = null;
        this.checkStatusInterval = null;

        this.generateCartItemList = this.generateCartItemList.bind(this);
        this.generatePaymentMethods = this.generatePaymentMethods.bind(this);
        this.handleShippingMethodSelect = this.handleShippingMethodSelect.bind(this);
        this.fetchUserInfo = this.fetchUserInfo.bind(this);
        this.placeOrder = this.placeOrder.bind(this);
        this.handleOrder = this.handleOrder.bind(this);
        this.handleApplyCoupon = this.handleApplyCoupon.bind(this);
    }

    componentWillMount() {
        this.fetchCartProducts();
        this.fetchUserInfo();
    }

    fetchCartProducts() {
        if (this.props.isLoggedIn) {
            return WebService.getCart(AuthService.getTokenUnsafe()).then(res => {
                // MockAPI.CART.getCart().then(res => {
                const result = JSON.parse(res);

                if (result.status.status === 'TRUE') {
                    if (result.products) {
                        result.products.forEach(prd => prd.images = JSON.parse(prd.images));
                    }
                    this.props.updateCartProducts(result.products);
                }
            });
        } else {
            return Promise.reject('Refresh cart failed');
        }
    }

    fetchUserInfo() {
        WebService.readAccountInfo(AuthService.getTokenUnsafe()).then(response => {
            let res = JSON.parse(response);

            if (res.status.status === 'TRUE') {
                this.setState({
                    fullName: res.fullName ? res.fullName : '',
                    address: res.address ? res.address : '',
                    phoneNumber: res.phone ? res.phone : '',
                    email: res.email ? res.email : '',
                });
            } else {
                console.err('Retrieve User info failed');
            }
        })
    }

    generateQRCode(orderInfo) {
        if (!this.zptranstoken) {
            console.log('zptranstoken is null');
        }

        return new Promise((resolve, reject) => {
            QRCode.toDataURL(JSON.stringify({
                appid: CONSTANT.APPID,
                zptranstoken: this.zptranstoken
            }), (err, url) => {
                if (err) {
                    console.log(err);
                } else {
                    Swal({
                        title: 'Zalopay Payment',
                        text: 'Use your Zalopay App to scan this QR-Code',
                        imageUrl: url,
                        // imageWidth: 400,
                        // imageHeight: 200,
                        imageAlt: 'QR Code',
                        animation: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        allowEnterKey: false,
                        showCancelButton: false,
                        showConfirmButton: true,
                        confirmButtonText: 'Cancel',
                        confirmButtonColor: 'gray',

                        preConfirm: () => {
                            if (window.confirm('Are you sure?')) {
                                if (this.checkStatusInterval) {
                                    clearInterval(this.checkStatusInterval);
                                }


                                return true;
                            }
                            return false;
                        },

                        onClose: () => {
                            resolve(false);
                        }
                    });
                }
            });
        });
    }

    placeOrder() {
        return new Promise((resolve, _reject) => {
            // console.log(this.state);
            // console.log(this.props.cartItems);

            WebService.toCheckout(
                AuthService.getTokenUnsafe(),
                this.state.couponCode,
                this.state.fullName,
                this.state.phoneNumber,
                this.state.email,
                this.state.address,
                this.state.shippingNote,
                this.state.shippingMethod.NAME
            ).then(res => {
                const result = JSON.parse(res);
                const orderID = result.orderId;
                if (result.status.status === ACTIVE_TYPE.TRUE) {

                    // Get zptranstoken if payment method is Zalopay
                    if (this.state.shippingMethod.NAME === PAYMENT_METHOD[0].NAME) {
                        const checkOrderZPInterval = setInterval(() => {
                            WebService.getZPTokenFromOrder(AuthService.getTokenUnsafe(), result.orderId).then(res => {
                                const result = JSON.parse(res);

                                if (result.status.status !== ACTIVE_TYPE.FALSE) {
                                    if (result.status.status !== 'PROCESSING') {
                                        clearInterval(checkOrderZPInterval);

                                        this.zalopayOrderId = result.orderId;
                                        this.zptranstoken = result.zptranstoken;
                                        resolve({
                                            status: true,
                                            payload: result
                                        });

                                        // Check order status

                                        let checkStatusInterval = setInterval(() => {
                                            WebService.getZalopayOrderStatus(AuthService.getTokenUnsafe(), Number(orderID)).then(res => {
                                                const result = JSON.parse(res);
                                                switch (result.status) {
                                                    case ZP_ORDER_STATUS.PROCESSING:
                                                        break;

                                                    case ZP_ORDER_STATUS.CANCELED:
                                                        Swal({
                                                            type: 'error',
                                                            title: 'No...',
                                                            text: 'Your payment has been canceled!'
                                                        })
                                                        break;

                                                    case ZP_ORDER_STATUS.SUCCESSFUL:
                                                        Swal({
                                                            type: 'success',
                                                            title: 'Yayy!!',
                                                            text: `You ordered successfully.`,
                                                            onClose: () => {
                                                                this.fetchCartProducts();
                                                                this.setState({
                                                                    redirectTo: <Redirect to={ROUTE_NAME.PRODUCTS} />
                                                                });
                                                            }
                                                        });
                                                        break;


                                                    default:
                                                        break;

                                                }
                                                if (result.status !== ZP_ORDER_STATUS.PROCESSING) {
                                                    clearInterval(checkStatusInterval);
                                                    clearInterval(checkOrderZPInterval);
                                                }
                                            });

                                        }, INTERNAL_CONFIG.INTERVAL_DURATION);

                                    }
                                } else {
                                    clearInterval(checkOrderZPInterval);
                                    resolve({
                                        status: false,
                                        message: result.status.message
                                    })
                                }
                            });
                        }, INTERNAL_CONFIG.INTERVAL_DURATION);
                    } else {
                        resolve({
                            status: true,
                            payload: result
                        });
                    }
                } else {
                    resolve({
                        status: false,
                        message: result.status.message,
                        payload: result
                    });
                }
            }).catch(res => {
                const result = JSON.parse(res);
                resolve({
                    status: false,
                    message: result.message,
                    payload: result
                });
            });
        });
    }

    handleApplyCoupon() {
        if (this.state.couponCode && this.state.couponStatusCode !== 1) {
            WebService.getCouponStatus(this.state.couponCode).then(res => {
                const result = JSON.parse(res);

                let couponMessage = '';
                switch (result.status) {
                    case -1:
                        couponMessage = 'Coupon is invalid'
                        break;
                    case 0:
                        couponMessage = 'Coupon is expired'
                        break;
                    case 1:
                        couponMessage = 'Coupon is applied'
                        break;

                    default:
                        break;
                }

                this.setState({
                    couponMessage,
                    couponStatusCode: result.status,
                    couponDiscPercent: result.discPercent,
                    couponMoney: result.money
                });
            });
        } else if (this.state.couponStatusCode === 1) {
            this.setState({
                couponCode: INITIAL_STATE.couponCode,
                couponStatusCode: INITIAL_STATE.couponStatusCode,
                couponMessage: INITIAL_STATE.couponMessage,
                couponDiscPercent: INITIAL_STATE.couponDiscPercent,
                couponMoney: INITIAL_STATE.couponMoney
            });
        }
    }

    handleOrder() {
        if (!this.state.shippingMethod.NAME) {
            this.setState({
                shippingMethodIsInvalid: true,
                errorMessage: 'Please choose a shipping method'
            });
        } else if (!this.state.fullName) {
            this.setState({
                fullNameIsInvalid: true,
                errorMessage: 'Please enter your name'
            });
        } else if (!this.state.email) {
            this.setState({
                emailIsInvalid: true,
                errorMessage: 'Please enter your email'
            });
        } else if (!this.state.address) {
            this.setState({
                addressIsInvalid: true,
                errorMessage: 'Please enter your address'
            });
        } else if (!this.state.phoneNumber) {
            this.setState({
                phoneNumberIsInvalid: true,
                errorMessage: 'Please enter your phone number'
            });
        } else {
            Swal({
                title: 'Ordering...',
                timer: INTERNAL_CONFIG.SWAL_TIMEOUT,
                allowOutsideClick: false,
                onOpen: () => {
                    Swal.showLoading();
                    this.placeOrder().then(res => {
                        if (res.status === true) {
                            // Order on AppServer successfully
                            if (this.state.shippingMethod.NAME !== PAYMENT_METHOD[0].NAME) {
                                Swal({
                                    type: 'success',
                                    title: 'Yayy!!',
                                    text: `You ordered successfully.`,
                                    onClose: () => {
                                        this.fetchCartProducts();
                                        this.setState({
                                            redirectTo: <Redirect to={ROUTE_NAME.PRODUCTS} />
                                        });
                                    }
                                });
                            }
                            else {
                                // Order using Zalopay
                                this.generateQRCode(res.status.toString()).then(status => {
                                    this.fetchCartProducts();
                                    this.setState({
                                        redirectTo: <Redirect to={ROUTE_NAME.PRODUCTS} />
                                    });
                                });
                            }

                        } else {
                            console.log(res);
                            Swal({
                                type: 'error',
                                title: 'Oops...',
                                text: `${res.message}`,
                            });
                        }
                    });
                },
            }).then(modalInfo => {
                if (modalInfo.dismiss === Swal.DismissReason.timer) {
                    Swal({
                        type: 'question',
                        title: 'Noo...',
                        text: `Server time out! Please try again later.`,
                    });
                }
            });
        }
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

    generateCartItemList() {
        let totalPrice = 0;
        let discountTotal = 0;
        let itemElements = this.props.cartItems.map((cartItem, index) => {
            let price = cartItem.price - cartItem.price * cartItem.discPercent;
            let discountPrice;

            discountPrice = price - price * this.state.couponDiscPercent - this.state.couponMoney;

            totalPrice += price * cartItem.amount;
            discountTotal += discountPrice * cartItem.amount;

            return (
                <li key={index} className="item-product-name">
                    <span>{`[${cartItem.amount}] ${cartItem.productName}`}</span>
                    <span>{`${withCommas(Math.round(price))} ₫`}</span>
                </li>
            );
        });

        this.total = totalPrice;
        this.discountTotal = discountTotal;
        return itemElements;
    }

    render() {
        return (
            <div>
                {this.state.redirectTo}
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
                                                <input type="text" className={"form-control" + (this.state.fullNameIsInvalid ? " is-invalid" : "")} id="full_name" required
                                                    value={this.state.fullName}
                                                    onChange={(e) => this.setState({ fullName: e.target.value, fullNameIsInvalid: false })}
                                                />
                                            </div>
                                            <div className="col-12 mb-4">
                                                <label htmlFor="email_address">Email <span>*</span></label>
                                                <input type="email" className={"form-control" + (this.state.emailIsInvalid ? " is-invalid" : "")} id="email_address"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value, emailIsInvalid: false })}
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
                                                <label htmlFor="street_address">Billing Address <span>*</span></label>
                                                <input type="text" className={"form-control mb-3" + (this.state.addressIsInvalid ? " is-invalid" : "")} id="street_address"
                                                    value={this.state.address}
                                                    onChange={(e) => this.setState({ address: e.target.value, addressIsInvalid: false })}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label htmlFor="phone_number">Phone No <span>*</span></label>
                                                <input type="number" className={"form-control" + (this.state.phoneNumberIsInvalid ? " is-invalid" : "")} id="phone_number" min="0"
                                                    value={this.state.phoneNumber}
                                                    onChange={(e) => this.setState({ phoneNumber: e.target.value, phoneNumberIsInvalid: false })}
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
                                                    <li className="item-header">
                                                        <div className="row">
                                                            <div className="col-md-5 d-flex align-items-center">
                                                                <span>COUPON</span>
                                                            </div>
                                                            <FormInput
                                                                type="text"
                                                                additionalClass="col-md-5 mb-0"
                                                                value={this.state.couponCode.toUpperCase()}
                                                                onChangeHandler={(e) => { this.setState({ couponCode: e.target.value }) }}
                                                                disabled={this.state.couponStatusCode === 1 ? true : false}
                                                            />
                                                            <button className={"col-md-2 btn btn-sm" + (this.state.couponStatusCode === 1 ? " btn-danger" : " btn-info")}
                                                                onClick={this.handleApplyCoupon}
                                                                disabled={!this.state.couponCode}
                                                            >
                                                                {this.state.couponStatusCode === 1 ? 'Cancel' : 'Apply'}
                                                            </button>
                                                            <div className="col-md-12 coupon-status-message text-right"
                                                                style={{ 'color': (this.state.couponStatusCode === 1 ? 'green' : 'red') }}
                                                            >
                                                                {this.state.couponMessage}
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="total-header"><span>Total</span>
                                                        <span>
                                                            <span className={this.discountTotal !== this.total ? "old-price" : ""}>{`${withCommas(Math.round(this.total + this.state.shippingFee))} ₫`}</span>
                                                            <br />
                                                            {this.discountTotal !== this.total ? `${withCommas(Math.round(this.discountTotal + this.state.shippingFee))} ₫` : ''}
                                                        </span>
                                                    </li>
                                                </ul>

                                                <div id="accordion" role="tablist" className={"mb-4 form-control shipping-method-container" + (this.state.shippingMethodIsInvalid ? ' is-invalid' : '')}>
                                                    {this.generatePaymentMethods()}
                                                </div>
                                                <div className="error-message d-flex justicy-content-center">
                                                    {this.state.errorMessage}
                                                </div>
                                                <button className="btn essence-btn"
                                                    onClick={() => this.handleOrder()}
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
                        <p><b>FEE: </b>{withCommas(Math.round(this.props.fee))} ₫</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckoutDetail;
