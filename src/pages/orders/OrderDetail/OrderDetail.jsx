// Stylsheet
import './OrderDetail.scss';

// External dependencies
import React from 'react';
import Moment from 'moment';
import PropTypes from 'prop-types';

// Internal dependencies
import AuthService from '../../../services/AuthService';
import WebService from '../../../services/WebService';
import { ACTIVE_TYPE } from '../../../config/constants';
import { withCommas } from '../../../helpers/lib';


class OrderDetail extends React.Component {
    static propTypes = {
        fetchOrderDetail: PropTypes.func,
        order: PropTypes.object,
        history: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.fetchOrderDetail = this.fetchOrderDetail.bind(this);
    }

    componentWillMount() {
        this.fetchOrderDetail(this.props.match.params.id);
    }

    fetchOrderDetail(orderId) {
        WebService.getOneOrder(AuthService.getTokenUnsafe(), orderId).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.props.fetchOrderDetail(result.order);
            }
        });
    }

    render() {
        return (
            <div>
                <div className="breadcumb_area bg-img" style={{ backgroundImage: "url(/img/bg-img/breadcumb.jpg)" }}>
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12">
                                <div className="page-title text-center">
                                    <h2>Order Details</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Breadcumb Area End ##### --> */}

                {/* <!-- ##### OrderDetail Grid Area Start ##### --> */}
                <section className="shop_grid_area section-padding-80">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-11">
                                <div className="regular-page-content-wrapper">
                                    <div className="regular-page-text">
                                        <OrderInfo order={this.props.order} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ##### OrderDetail Grid Area End ##### --> */}
            </div>
        );
    }
}

class OrderInfo extends React.Component {
    generateProductList(products) {
        let totalPrice = 0;
        let itemElements = products.map((product, index) => {
            let price = (product.price - product.price * product.discPercent) * product.amount;

            totalPrice += price;

            return (
                <li key={index} className="item-product-name">
                    <span>{`[${product.amount}] ${product.productName}`}</span>
                    <span>{`${withCommas(price)} ₫`}</span>
                </li>
            );
        });

        this.total = totalPrice;
        return itemElements;
    }

    render() {
        const order = this.props.order;
        return (
            <div className="col-12">
                <div className="order-details-confirmation">
                    {
                        order.products ?
                            <>
                                <div className="cart-page-heading d-flex justify-content-between">
                                    <div className="user-info">
                                        <h5>{order.fullName}</h5>
                                        <p>{`${order.email} - ${order.phone}`}</p>
                                        <p>{`${order.address}`}</p>
                                    </div>
                                    <div className="order-status-container">
                                        {order.status}
                                    </div>
                                </div>
                                <div>
                                    <OrderHistoryTimeline history={order.history} />
                                </div>
                                <ul className="order-details-form mb-4">
                                    <li className="item-header"><span>Product</span> <span>Price</span></li>
                                    {this.generateProductList(order.products)}
                                    {/* <li className="item-header"><span>Shipping</span> <span>{`FREE`}</span></li> */}
                                    <li className="item-header"><span>Coupon used</span> <span>{order.couponId !== 1 ? order.couponId : 'NONE'}</span></li>

                                    <li className="total-header"><span>Total</span> <span>{`${withCommas(order.total)} ₫`}</span></li>
                                </ul>

                                <div id="accordion" role="tablist" className={"mb-4 form-control shipping-method-container"}>
                                </div>
                                <button className="btn essence-btn"
                                >Export Bill</button>
                            </>
                            : <div className="text-center">Order not found</div>
                    }
                </div>
            </div>
        );
    }
}

class OrderHistoryTimeline extends React.Component {

    generateDiplome() {
        const history = this.props.history;

        return history.map((history, index) => {
            let timestamp = Moment(history.date).format("D/M/YY").toString();
            return (
                <li key={index}>
                    <p className="diplome">{history.status}</p>
                    <span className="point"></span>
                    <div className="diplome-date text-center">{timestamp}</div>
                </li>
            );
        })
    }


    render() {
        return (
            <div className="timeline-container">
                <ol className="timeline">
                    {this.generateDiplome()}
                </ol>
            </div>
        );
    }
}

export default OrderDetail;
