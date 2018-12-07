// Stylsheet
import './OrderDetail.scss';

// External dependencies
import React from 'react';
// import PropTypes from 'prop-types';

// Internal dependencies
import Paginator from '../../common/Paginator';

const INTIAL_STATE = {
}


class OrderDetail extends React.Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;


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

                    </div>
                </section>
                {/* <!-- ##### OrderDetail Grid Area End ##### --> */}
            </div>
        );
    }
}


export default OrderDetail;
