import React from 'react';
import './Products.scss';

import MockAPI from '../../../helpers/MockAPI';
import CONSTANT from '../../../config/constants'

import SearchPanel from '../SearchPanel';
import Paginator from '../../common/Paginator';

export default class Products extends React.Component {
    constructor(props) {
        super(props);

        this.generateProducts = this.generateProducts.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillMount() {
        MockAPI.Product.getAll().then((products) => {
            this.props.updateProductList(JSON.parse(products));
        });
    }

    handleFilterChange({ currentPage, pageSize }) {
        let payloadObj = {}

        if (currentPage) {
            payloadObj.currentPage = currentPage;
        }

        if (pageSize) {
            payloadObj.currentPage = 1;
            payloadObj.pageSize = pageSize;
        }

        this.props.changePageInfo(payloadObj);
    }


    generateProducts() {
        const products = this.props.products;
        const productsElements = [];

        products.forEach((product) => {
            productsElements.push(
                <Product
                    key={product.id}
                    product={product}
                    buttonTitle="Add to cart"
                />
            );
        });

        return productsElements;
    }

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
                                                    <p><span>{this.props.products.length}</span> products found</p>
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

                                    {/* PRODUCTS */}
                                    <div className="row">
                                        {this.generateProducts()}
                                    </div>
                                </div>
                                <Paginator
                                    handlePageChange={(currentPage) => { this.handleFilterChange({ currentPage }) }}
                                    currentPage={this.props.currentPage}
                                    pageSize={this.props.pageSize}
                                    totalItems={this.props.totalItems}
                                />
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- ##### Shop Grid Area End ##### --> */}
            </div>
        );
    }
}

class Product extends React.Component {
    render() {
        const product = this.props.product;
        return (
            < div className="col-12 col-sm-6 col-lg-4" >
                <div className="single-product-wrapper">
                    {/* <!-- Product Image --> */}
                    <div className="product-img">
                        <img src={product.images[0]} alt="" />
                        {/* <!-- Hover Thumb --> */}
                        <img className="hover-img" src={product.images[1]} alt="" />

                        {/* <!-- Product Badge --> */}
                        <div className="product-badge offer-badge">
                            <span>{'-' + product.disc_percent * 100 + '%'}</span>
                        </div>

                        {/* <!-- Favourite --> */}
                        <div className="product-favourite">
                            <a href="/" className="favme fa fa-heart">f</a>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <span>{product.category.name}</span>
                        <a href={CONSTANT.ROUTE.PRODUCT_DETAIL + '/' + product.id}>
                            <h6>{product.product_name}</h6>
                        </a>
                        <p className="product-price"><span className="old-price">{product.price + 'VND'}</span> {product.price * product.disc_percent + 'VND'}</p>

                        {/* <!-- Hover Content --> */}
                        <div className="hover-content">
                            {/* <!-- Add to Cart --> */}
                            <div className="add-to-cart-btn">
                                <a href={CONSTANT.ROUTE.PRODUCT_DETAIL + '/' + product.id} className="btn essence-btn">{this.props.buttonTitle}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
