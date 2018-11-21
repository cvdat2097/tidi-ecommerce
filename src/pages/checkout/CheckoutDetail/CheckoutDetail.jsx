import React from 'react';
import './CheckoutDetail.scss';

const INITIAL_STATE = {
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    city: '',
    province: '',
    phoneNumber: '',
    email: '',
    shippingNote: ''
}


export default class CheckoutDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

    }


    placeOrder() {
        console.log(this.state);
        this.setState(INITIAL_STATE)
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
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="first_name">First Name <span>*</span></label>
                                                <input type="text" className="form-control" id="first_name" required
                                                    value={this.state.firstName}
                                                    onChange={(e) => this.setState({ firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="last_name">Last Name <span>*</span></label>
                                                <input type="text" className="form-control" id="last_name" required
                                                    value={this.state.lastName}
                                                    onChange={(e) => this.setState({ lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label htmlFor="company">Company Name</label>
                                                <input type="text" className="form-control" id="company"
                                                    value={this.state.companyName}
                                                    onChange={(e) => this.setState({ companyName: e.target.value })}
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
                                                <label htmlFor="city">Town/City <span>*</span></label>
                                                <input type="text" className="form-control" id="city"
                                                    value={this.state.city}
                                                    onChange={(e) => this.setState({ city: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12 mb-3">
                                                <label htmlFor="province">Province <span>*</span></label>
                                                <input type="text" className="form-control" id="province"
                                                    value={this.state.province}
                                                    onChange={(e) => this.setState({ province: e.target.value })}
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
                                                <label htmlFor="email_address">Email Address <span>*</span></label>
                                                <input type="email" className="form-control" id="email_address"
                                                    value={this.state.email}
                                                    onChange={(e) => this.setState({ email: e.target.value })}
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

                                    <div className="cart-page-heading">
                                        <h5>Your Order</h5>
                                        <p>The Details</p>
                                    </div>

                                    <ul className="order-details-form mb-4">
                                        <li className="item-header"><span>Product</span> <span>Total</span></li>
                                        <li className="item-product-name"><span>Cocktail Yellow dress    X 1</span> <span>$59.90</span></li>
                                        <li className="item-product-name"><span>Cocktail Orange dress    X 3</span> <span>$197.90</span></li>
                                        <li className="item-product-name"><span>Cocktail Purple dress    X 1</span> <span>$342.90</span></li>
                                        <li className="item-header"><span>Subtotal</span> <span>FREE</span></li>
                                        <li className="item-header"><span>Shipping</span> <span>Free</span></li>
                                        <li className="total-header"><span>Total</span> <span>$600.7</span></li>
                                    </ul>

                                    <div id="accordion" role="tablist" className="mb-4">
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingOne">
                                                <h6 className="mb-0">
                                                    <a data-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne"><i className="fa fa-circle-o mr-3"></i>Paypal</a>
                                                </h6>
                                            </div>

                                            <div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pharetra tempor so dales. Phasellus sagittis auctor gravida. Integ er bibendum sodales arcu id te mpus. Ut consectetur lacus.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingTwo">
                                                <h6 className="mb-0">
                                                    <a className="collapsed" data-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"><i className="fa fa-circle-o mr-3"></i>cash on delievery</a>
                                                </h6>
                                            </div>
                                            <div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo quis in veritatis officia inventore, tempore provident dignissimos.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingThree">
                                                <h6 className="mb-0">
                                                    <a className="collapsed" data-toggle="collapse" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"><i className="fa fa-circle-o mr-3"></i>credit card</a>
                                                </h6>
                                            </div>
                                            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse quo sint repudiandae suscipit ab soluta delectus voluptate, vero vitae</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" role="tab" id="headingFour">
                                                <h6 className="mb-0">
                                                    <a className="collapsed" data-toggle="collapse" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour"><i className="fa fa-circle-o mr-3"></i>direct bank transfer</a>
                                                </h6>
                                            </div>
                                            <div id="collapseFour" className="collapse show" role="tabpanel" aria-labelledby="headingThree" data-parent="#accordion">
                                                <div className="card-body">
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est cum autem eveniet saepe fugit, impedit magni.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="btn essence-btn"
                                        onClick={() => this.placeOrder()}
                                    >Place Order</button>
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
