import React from 'react';
import './Footer.scss';

export default class Footer extends React.Component {
    render() {
        return (
            // <!-- ##### Footer Area Start ##### -->
            <footer className="footer_area clearfix">
                <div className="container">
                    <div className="row">
                        {/* <!-- Single Widget Area --> */}
                        <div className="col-12 col-md-6">
                            <div className="single_widget_area d-flex mb-30">
                                {/* <!-- Logo --> */}
                                <div className="footer-logo mr-50">
                                    <a href="/"><img src="/img/core-img/logo.png" alt="" /></a>
                                </div>
                                {/* <!-- Footer Menu --> */}
                                <div className="footer_menu">
                                    <ul>
                                        <li><a href="shop.html">Shop</a></li>
                                        <li><a href="blog.html">Blog</a></li>
                                        <li><a href="contact.html">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Single Widget Area --> */}
                        <div className="col-12 col-md-6">
                            <div className="single_widget_area mb-30">
                                <ul className="footer_widget_menu">
                                    <li><a href="/">Order Status</a></li>
                                    <li><a href="/">Payment Options</a></li>
                                    <li><a href="/">Shipping and Delivery</a></li>
                                    <li><a href="/">Guides</a></li>
                                    <li><a href="/">Privacy Policy</a></li>
                                    <li><a href="/">Terms of Use</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-end">
                        {/* <!-- Single Widget Area --> */}
                        <div className="col-12 col-md-6">
                            <div className="single_widget_area">
                                <div className="footer_heading mb-30">
                                    <h6>Subscribe</h6>
                                </div>
                                <div className="subscribtion_form">
                                    <form action="#" method="post">
                                        <input type="email" name="mail" className="mail" placeholder="Your email here" />
                                        <button type="submit" className="submit"><i className="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* <!-- Single Widget Area --> */}
                        <div className="col-12 col-md-6">
                            <div className="single_widget_area">
                                <div className="footer_social_area">
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="Facebook"><i className="fa fa-facebook" aria-hidden="true"></i><span style={{ display: "none" }}>f</span></a>
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="Instagram"><i className="fa fa-instagram" aria-hidden="true"></i><span style={{ display: "none" }}>i</span></a>
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="Twitter"><i className="fa fa-twitter" aria-hidden="true"></i><span style={{ display: "none" }}>t</span></a>
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="Pinterest"><i className="fa fa-pinterest" aria-hidden="true"></i><span style={{ display: "none" }}>p</span></a>
                                    <a href="/" data-toggle="tooltip" data-placement="top" title="Youtube"><i className="fa fa-youtube-play" aria-hidden="true"></i><span style={{ display: "none" }}>y</span></a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-12 text-center">
                            <p>
                                {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                                {/* Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
            <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                            </p>
                        </div>
                    </div>

                </div>
            </footer>
            // {/* <!-- ##### Footer Area End ##### --> */}
        );
    }
}
