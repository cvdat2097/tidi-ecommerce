import React from 'react';
import { withRouter } from 'react-router-dom';
import './Products.scss';

import MockAPI from '../../../helpers/MockAPI';
import { ROUTE_NAME } from '../../../routes/main.routing';

import SearchPanel from '../SearchPanel';
import Paginator from '../../common/Paginator';
import LoadingBar from '../../common/LoadingBar';

const INTIAL_STATE = {
    loadingBar: <LoadingBar />
}

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;

        this.generateProducts = this.generateProducts.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const pageIndex = Number(params.get('page'));
        const pageSize = Number(params.get('size'));
        if (
            pageIndex
            && pageSize
            && [12, 24, 36].indexOf(pageSize) !== -1
        ) {
            this.handleFilterChange({
                currentPage: pageIndex,
                pageSize: pageSize
            });
        } else {
            this.fetchProducts(this.props.currentPage, this.props.pageSize);
            this.updateURLParams(this.props.currentPage, this.props.pageSize);
        }

    }

    updateURLParams(currentPage, pageSize) {
        this.props.history.push({
            search: `?size=${pageSize || this.props.pageSize}&page=${currentPage || this.props.currentPage}`
        });
    }

    fetchProducts(currentPage, pageSize) {
        MockAPI.Product.getSome((currentPage - 1) * pageSize, pageSize).then((res) => {
            const result = JSON.parse(res);

            console.log('GOT: ' + result.products.length);
            this.props.updateProductList(result.products);
            this.props.changePageInfo({ totalItems: result.totalItems });
        });
    }

    handleFilterChange({ currentPage, pageSize, totalItems }) {
        let payloadObj = {}

        if (currentPage) {
            payloadObj.currentPage = currentPage;
        }

        if (pageSize) {
            payloadObj.pageSize = pageSize;
        }

        if (totalItems) {
            payloadObj.totalItems = totalItems;
        }

        this.props.changePageInfo(payloadObj);
        if (pageSize || currentPage) {
            this.updateURLParams(payloadObj.currentPage, payloadObj.pageSize);
            this.fetchProducts(
                payloadObj.currentPage || this.props.currentPage,
                payloadObj.pageSize || this.props.pageSize
            );
        }
    }


    generateProducts() {
        const products = this.props.products;
        const productsElements = [];

        products.forEach((product, index) => {
            productsElements.push(
                <Product
                    // key={product.id}
                    key={index}
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
                {this.state.loadingBar}
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
                                                    <p><span>{this.props.totalItems}</span> products found</p>
                                                </div>
                                                <div className="d-flex">
                                                    {/* <!-- Number of Items --> */}
                                                    <div className="product-sorting d-flex mr-3">
                                                        <p>Display:</p>
                                                        <form action="#" method="get">
                                                            <select name="select"
                                                                value={this.props.pageSize}
                                                                onChange={(e) => { this.handleFilterChange({ pageSize: e.target.value, currentPage: 1 }) }}
                                                            >
                                                                <option value={12}>12</option>
                                                                <option value={24}>24</option>
                                                                <option value={36}>36</option>
                                                            </select>
                                                            <input type="submit" className="d-none" value="" />
                                                        </form>
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
                            <span>{'-' + product.discPercent * 100 + '%'}</span>
                        </div>

                        {/* <!-- Favourite --> */}
                        <div className="product-favourite">
                            <a href="/" className="favme fa fa-heart">f</a>
                        </div>
                    </div>

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <span>{product.category.categoryName}</span>
                        <a href={ROUTE_NAME.PRODUCT_DETAIL + '/' + product.id}>
                            <h6>{product.productName}</h6>
                        </a>
                        <p className="product-price"><span className="old-price">{product.price + 'VND'}</span> {product.price * product.discPercent + 'VND'}</p>

                        {/* <!-- Hover Content --> */}
                        <div className="hover-content">
                            {/* <!-- Add to Cart --> */}
                            <div className="add-to-cart-btn">
                                <a href={ROUTE_NAME.PRODUCT_DETAIL + '/' + product.id} className="btn essence-btn">{this.props.buttonTitle}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}


export default withRouter(Products);
