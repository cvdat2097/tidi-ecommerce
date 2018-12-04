import React from 'react';
import './ProductDetail.scss';

// import MockAPI from '../../../helpers/MockAPI';
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';

import Loader from '../../common/Loader/Loader';

const INTITIAL_STATE = {
    product: {},
    productFound: false
}

export default class ProductDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = INTITIAL_STATE;

        this.fetchCartProducts = this.fetchCartProducts.bind(this);
        this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
    }

    componentWillMount() {
        const productId = Number(this.props.match.params.id);
        if (!isNaN(productId) && productId > 0) {
            this.fetchProduct(productId);
        }
    }

    fetchProduct(productId) {
        WebService.getProduct(productId).then(res => {
            // MockAPI.Product.getOne(productId).then((res) => {
            const product = JSON.parse(res);
            if (product.status !== 500) {
                product.images = JSON.parse(product.images);
                this.setState({
                    product,
                    productFound: true
                });
            } else {
                console.log(product);
            }
        });
    }

    fetchCartProducts() {
        if (this.props.isLoggedIn) {
            WebService.getCart(AuthService.getTokenUnsafe()).then(res => {
                // MockAPI.CART.getCart().then(res => {
                const result = JSON.parse(res);

                if (result.status.status === 'TRUE' && result.products) {
                    result.products.forEach(prd => prd.images = JSON.parse(prd.images));
                    this.props.updateCartProducts(result.products);
                }
            });
        }
    }

    handleAddProductToCart(product) {
        const currentCartItems = this.props.cart.products;
        if (product.id) {
            let cartItemAmount = 0;
            for (let cartItem in currentCartItems) {
                if (cartItem.id === product.id) {
                    cartItemAmount = cartItem.amount;
                }
            }

            WebService.addItemToCart(AuthService.getTokenUnsafe(), product.id, cartItemAmount + 1)
                .then(r => {
                    const res = JSON.parse(r);
                    if (res.status) {
                        this.fetchCartProducts();
                    }
                })
        }
    }

    generatePictures() {
        let r = [];

        if (this.state.product.images) {
            this.state.product.images.forEach((imageURL, index) => {
                r.push(
                    <div key={index} className={"carousel-item" + (index === 0 ? " active" : "")}>
                        <img className="d-block w-100" src={imageURL} alt="" />
                    </div>
                );
            });
        }

        return r;
    }


    render() {
        if (!this.state.productFound) {
            return <div className="d-flex justify-content-center p-5">Product not found</div>
        } else if (Object.keys(this.state.product).length === 0) {
            return <Loader />
        }
        else {
            const product = this.state.product;
            const discountedPrice = product.price - product.price * product.discPercent;
            return (
                <div className="single_product_details_area d-flex align-items-center">
                    <div id="images-slider" className="single_product_thumb carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            {this.generatePictures()}
                        </div>
                        <a className="carousel-control-prev owl-prev" href="#images-slider" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next owl-next" href="#images-slider" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    {/* <!-- Single Product Description --> */}
                    <div className="single_product_desc clearfix">
                        <span>{product.brand && product.brand.brandName}</span>
                        <a href="cart.html">
                            <h2>{product.productName}</h2>
                        </a>
                        <p className="product-price">
                            {
                                product.discPercent !== 0 &&
                                <span className="old-price">{product.price + ' VND'}</span>
                            }
                            {discountedPrice + ' VND'}
                        </p>
                        <p className="product-desc">{product.description}</p>

                        {/* <!-- Form --> */}
                        <form className="cart-form clearfix" method="post">
                            {/* <!-- Select Box --> */}
                            <div className="form-group select-box d-flex mt-50 mb-30">
                                <select name="select" id="productSize" className="mr-3 form-control">
                                    <option value="value">Size: XL</option>
                                    <option value="value">Size: X</option>
                                    <option value="value">Size: M</option>
                                    <option value="value">Size: S</option>
                                </select>
                                <select name="select" id="productColor" className="form-control">
                                    <option value="value">Color: Black</option>
                                    <option value="value">Color: White</option>
                                    <option value="value">Color: Red</option>
                                    <option value="value">Color: Purple</option>
                                </select>
                            </div>
                            {/* <!-- Cart & Favourite Box --> */}
                            <div className="cart-fav-box d-flex align-items-center">
                                {/* <!-- Cart --> */}
                                <button type="button" name="addtocart" className="btn essence-btn"
                                    onClick={() => this.handleAddProductToCart(product)}
                                >Add to cart</button>
                                {/* <!-- Favourite --> */}
                                <div className="product-favourite ml-4">
                                    <a href="#/" className="favme fa fa-heart" ><span></span></a>
                                </div>
                            </div>

                            <div className="cart-fav-box d-flex align-items-center justify-content-end">
                                <a href="/">{product.category && product.category.categoryName}</a>
                            </div>
                        </form>
                    </div>

                    {/* PRODUCT FULL DESCRIPTION */}
                    <div className="full-description-container">
                        <div className="container">
                            {product.description}
                        </div>
                    </div>

                </div>
            );
        }
    }
}
