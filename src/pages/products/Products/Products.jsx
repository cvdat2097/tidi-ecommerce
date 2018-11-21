import React from 'react';
import './Products.scss';

import SearchPanel from '../SearchPanel';
import Pagination from '../Pagination';

export default class Products extends React.Component {
    render() {
        return (
            <div>
                {/* <!-- ##### Breadcumb Area Start ##### --> */}
                <div className="breadcumb_area bg-img" style={{ backgroundImage: "url(img/bg-img/breadcumb.jpg)" }}>
                    <div className="container h-100">
                        <div className="row h-100 align-items-center">
                            <div className="col-12">
                                <div className="page-title text-center">
                                    <h2>Products</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- ##### Breadcumb Area End ##### --> */}

                {/* <!-- ##### Shop Grid Area Start ##### --> */}
                <section className="shop_grid_area section-padding-80">
                    <div className="container">
                        <div className="row">
                        
                            <div className="col-12 col-md-4 col-lg-3">
                                <SearchPanel />
                            </div>

                            <div className="col-12 col-md-8 col-lg-9">
                                <div className="shop_grid_product_area">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="product-topbar d-flex align-items-center justify-content-between">
                                                {/* <!-- Total Products --> */}
                                                <div className="total-products">
                                                    <p><span>186</span> products found</p>
                                                </div>
                                                {/* <!-- Sorting --> */}
                                                <div className="product-sorting d-flex">
                                                    <p>Sort by:</p>
                                                    <form action="#" method="get">
                                                        <select name="select" id="sortByselect">
                                                            <option value="value">Highest Rated</option>
                                                            <option value="value">Newest</option>
                                                            <option value="value">Price: $$ - $</option>
                                                            <option value="value">Price: $ - $$</option>
                                                        </select>
                                                        <input type="submit" className="d-none" value="" />
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        {/* <!-- Single Product --> */}
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="single-product-wrapper">
                                                {/* <!-- Product Image --> */}
                                                <div className="product-img">
                                                    <img src="img/product-img/product-5.jpg" alt="" />
                                                    {/* <!-- Hover Thumb --> */}
                                                    <img className="hover-img" src="img/product-img/product-6.jpg" alt="" />

                                                    {/* <!-- Product Badge --> */}
                                                    <div className="product-badge offer-badge">
                                                        <span>-30%</span>
                                                    </div>

                                                    {/* <!-- Favourite --> */}
                                                    <div className="product-favourite">
                                                        <a href="/" className="favme fa fa-heart">f</a>
                                                    </div>
                                                </div>

                                                {/* <!-- Product Description --> */}
                                                <div className="product-description">
                                                    <span>topshop</span>
                                                    <a href="single-product-details.html">
                                                        <h6>Knot Front Mini Dress</h6>
                                                    </a>
                                                    <p className="product-price"><span className="old-price">$75.00</span> $55.00</p>

                                                    {/* <!-- Hover Content --> */}
                                                    <div className="hover-content">
                                                        {/* <!-- Add to Cart --> */}
                                                        <div className="add-to-cart-btn">
                                                            <a href="/" className="btn essence-btn">Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Single Product --> */}
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="single-product-wrapper">
                                                {/* <!-- Product Image --> */}
                                                <div className="product-img">
                                                    <img src="img/product-img/product-6.jpg" alt="" />
                                                    {/* <!-- Hover Thumb --> */}
                                                    <img className="hover-img" src="img/product-img/product-7.jpg" alt="" />

                                                    {/* <!-- Favourite --> */}
                                                    <div className="product-favourite">
                                                        <a href="/" className="favme fa fa-heart">f:</a>
                                                    </div>
                                                </div>

                                                {/* <!-- Product Description --> */}
                                                <div className="product-description">
                                                    <span>topshop</span>
                                                    <a href="single-product-details.html">
                                                        <h6>Knot Front Mini Dress</h6>
                                                    </a>
                                                    <p className="product-price">$80.00</p>

                                                    {/* <!-- Hover Content --> */}
                                                    <div className="hover-content">
                                                        {/* <!-- Add to Cart --> */}
                                                        <div className="add-to-cart-btn">
                                                            <a href="/" className="btn essence-btn">Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Single Product --> */}
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="single-product-wrapper">
                                                {/* <!-- Product Image --> */}
                                                <div className="product-img">
                                                    <img src="img/product-img/product-7.jpg" alt="" />
                                                    {/* <!-- Hover Thumb --> */}
                                                    <img className="hover-img" src="img/product-img/product-8.jpg" alt="" />

                                                    {/* <!-- Product Badge --> */}
                                                    <div className="product-badge new-badge">
                                                        <span>New</span>
                                                    </div>

                                                    {/* <!-- Favourite --> */}
                                                    <div className="product-favourite">
                                                        <a href="/" className="favme fa fa-heart">f</a>
                                                    </div>
                                                </div>

                                                {/* <!-- Product Description --> */}
                                                <div className="product-description">
                                                    <span>topshop</span>
                                                    <a href="single-product-details.html">
                                                        <h6>Knot Front Mini Dress</h6>
                                                    </a>
                                                    <p className="product-price">$80.00</p>

                                                    {/* <!-- Hover Content --> */}
                                                    <div className="hover-content">
                                                        {/* <!-- Add to Cart --> */}
                                                        <div className="add-to-cart-btn">
                                                            <a href="/" className="btn essence-btn">Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Single Product --> */}
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="single-product-wrapper">
                                                {/* <!-- Product Image --> */}
                                                <div className="product-img">
                                                    <img src="img/product-img/product-8.jpg" alt="" />
                                                    {/* <!-- Hover Thumb --> */}
                                                    <img className="hover-img" src="img/product-img/product-9.jpg" alt="" />

                                                    {/* <!-- Favourite --> */}
                                                    <div className="product-favourite">
                                                        <a href="/" className="favme fa fa-heart">f</a>
                                                    </div>
                                                </div>

                                                {/* <!-- Product Description --> */}
                                                <div className="product-description">
                                                    <span>topshop</span>
                                                    <a href="single-product-details.html">
                                                        <h6>Knot Front Mini Dress</h6>
                                                    </a>
                                                    <p className="product-price">$80.00</p>

                                                    {/* <!-- Hover Content --> */}
                                                    <div className="hover-content">
                                                        {/* <!-- Add to Cart --> */}
                                                        <div className="add-to-cart-btn">
                                                            <a href="/" className="btn essence-btn">Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <!-- Single Product --> */}
                                        <div className="col-12 col-sm-6 col-lg-4">
                                            <div className="single-product-wrapper">
                                                {/* <!-- Product Image --> */}
                                                <div className="product-img">
                                                    <img src="img/product-img/product-9.jpg" alt="" />
                                                    {/* <!-- Hover Thumb --> */}
                                                    <img className="hover-img" src="img/product-img/product-1.jpg" alt="" />

                                                    {/* <!-- Favourite --> */}
                                                    <div className="product-favourite">
                                                        <a href="/" className="favme fa fa-heart">f</a>
                                                    </div>
                                                </div>

                                                {/* <!-- Product Description --> */}
                                                <div className="product-description">
                                                    <span>topshop</span>
                                                    <a href="single-product-details.html">
                                                        <h6>Knot Front Mini Dress</h6>
                                                    </a>
                                                    <p className="product-price">$80.00</p>

                                                    {/* <!-- Hover Content --> */}
                                                    <div className="hover-content">
                                                        {/* <!-- Add to Cart --> */}
                                                        <div className="add-to-cart-btn">
                                                            <a href="/" className="btn essence-btn">Add to Cart</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <Pagination />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ##### Shop Grid Area End ##### --> */}
            </div>
        );
    }
}
