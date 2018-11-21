import React from 'react';
import './ProductDetail.scss';

export default class ProductDetail extends React.Component {

    render() {
        return (
            <div className="single_product_details_area d-flex align-items-center">
                {/* <!-- Single Product Thumb --> */}
                {/* <div className="single_product_thumb">
                    <div className="product_thumbnail_slides">
                        <img src="img/product-img/product-big-1.jpg" alt="" />
                        <img src="img/product-img/product-big-2.jpg" alt="" />
                        <img src="img/product-img/product-big-3.jpg" alt="" />
                    </div>
                </div> */}
                <div id="images-slider" className="single_product_thumb carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-block w-100" src="/img/product-img/product-big-1.jpg" alt="First slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/img/product-img/product-big-2.jpg" alt="Second slide" />
                        </div>
                        <div className="carousel-item">
                            <img className="d-block w-100" src="/img/product-img/product-big-3.jpg" alt="Third slide" />
                        </div>
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
                    <span>mango</span>
                    <a href="cart.html">
                        <h2>One Shoulder Glitter Midi Dress</h2>
                    </a>
                    <p className="product-price"><span className="old-price">$65.00</span> $49.00</p>
                    <p className="product-desc">Mauris viverra cursus ante laoreet eleifend. Donec vel fringilla ante. Aenean finibus velit id urna vehicula, nec maximus est sollicitudin.</p>

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
                            <button type="submit" name="addtocart" value="5" className="btn essence-btn">Add to cart</button>
                            {/* <!-- Favourite --> */}
                            <div className="product-favourite ml-4">
                                <a href="/" className="favme fa fa-heart">f</a>
                            </div>
                        </div>
                    </form>
                </div>

                {/* PRODUCT FULL DESCRIPTION */}
                <div className="full-description-container">
                    <div className="container">
                    Thiết kế được nâng cấp nhiều về phần cứng bên trong
Điện Thoại iPhone XS cuối cùng cũng chính thức giới thiệu những chiếc iPhone X thế hệ mới với tên gọi XS. XS được đọc là "ten ess", từ s được đặt trong một ô vuông. iPhone XS cũng giống như truyền thống của Apple khi hầu như không thay đổi thiết kế bên ngoài và chỉ nâng cấp nhiều về phần cứng bên trong. iPhone XS được trang bị kính bảo vệ mới cho màn hình được Apple nói rằng đó là loại kính bền nhất trên smartphone hiện nay. Máy đạt chuẩn chống nước bụi IP68.
                    </div>
                </div>

            </div>
        );
    }
}
