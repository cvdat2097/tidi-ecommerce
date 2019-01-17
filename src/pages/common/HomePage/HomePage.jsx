// Stylesheets
import './HomePage.scss';

// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Internal Dependencies
import { ROUTE_NAME } from '../../../routes/main.routing';

class HomePage extends React.Component {
    render() {
        return (
            <>
                <section className="welcome_area bg-img background-overlay" style={{ "backgroundImage": "url(/img/bg-img/bg-1.jpg)" }}>
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12">
                                <div className="hero-content">
                                    <h6>asoss</h6>
                                    <h2>New Collection</h2>
                                    <Link to={ROUTE_NAME.PRODUCTS} className="btn essence-btn">view collection</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ##### Top Catagory Area Start ##### --> */}
                <div className="top_catagory_area section-padding-80 clearfix">
                    <div className="container">
                        <div className="row justify-content-center">
                            {/* <!-- Single Catagory --> */}
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ "backgroundImage": "url(/img/bg-img/bg-2.jpg)" }}>
                                    <div className="catagory-content">
                                        <a href="#/">Clothing</a>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Catagory --> */}
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ "backgroundImage": "url(/img/bg-img/bg-3.jpg)" }}>
                                    <div className="catagory-content">
                                        <a href="#/">Shoes</a>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Single Catagory --> */}
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="single_catagory_area d-flex align-items-center justify-content-center bg-img" style={{ "backgroundImage": "url(/img/bg-img/bg-4.jpg)" }}>
                                    <div className="catagory-content">
                                        <a href="#/">Accessories</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Top Catagory Area End ##### --> */}

                {/* <!-- ##### CTA Area Start ##### --> */}
                <div className="cta-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="cta-content bg-img background-overlay" style={{ "backgroundImage": "url(/img/bg-img/bg-5.jpg)" }}>
                                    <div className="h-100 d-flex align-items-center justify-content-end">
                                        <div className="cta--text">
                                            <h6>-60%</h6>
                                            <h2>Global Sale</h2>
                                            <a href="#/" className="btn essence-btn">Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### CTA Area End ##### --> */}


                {/* <!-- ##### Brands Area Start ##### --> */}
                <div className="brands-area d-flex align-items-center justify-content-between">
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand1.png" alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand2.png" alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand3.png" alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand4.png" alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand5.png" alt="" />
                    </div>
                    {/* <!-- Brand Logo --> */}
                    <div className="single-brands-logo">
                        <img src="img/core-img/brand6.png" alt="" />
                    </div>
                </div>
                {/* <!-- ##### Brands Area End ##### --> */}
            </>
        );
    }
}

export default HomePage;
