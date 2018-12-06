// Stylsheet
import './AdminProduct.scss';

// External dependencies
import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

// Internal dependencies
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
import HelperTool from '../../../helpers/lib';
import { DEFAULT_FORMDATA, ACTIVE_TYPE } from '../../../config/constants';

import Modal from '../../common/Modal';
import AdminAddProduct from './AdminAddProduct';
import Paginator from '../../common/Paginator';
import Message from '../../common/FormMessage';

const INTIAL_STATE = {
    showLoadingBar: false,
    message: '',
    brands: [],
    industries: [],
    branches: [],
    categories: []
}

const INTERNAL_CONFIG = {
    HEADING_NAME: 'Product',
    SEARCH_DELAY_DURATION: 300,
    PAGE_SIZE_ARR: [10, 25, 50, 100],
    MAIN_HEADERS: ['ID', 'Product Name', 'Price', 'In Stock', 'Brand', 'Category', 'Active', 'Actions'],
    DETAIL_HEADERS: ['Images', 'Description'],
}

class AdminProduct extends React.Component {
    static propTypes = {
        // currentPage: PropTypes.number,
        // pageSize: PropTypes.number,
        // totalItems: PropTypes.number,
        // fetchProducts: PropTypes.func,
        // changePageInfo: PropTypes.func,
        // query: PropTypes.shape({
        //     keyword: PropTypes.string
        // }),
        // formData: PropTypes.shape({

        // })
    }

    productToBlock = null;
    originalProductInfo = {};
    searchInterval = null;

    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.handleUpdateProduct = this.handleUpdateProduct.bind(this);
        this.handleDeleteProduct = this.handleDeleteProduct.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
        this.fetchProducts = this.fetchProducts.bind(this);
        this.fetchAllBrands = this.fetchAllBrands.bind(this);
        this.fetchAllIndustries = this.fetchAllIndustries.bind(this);
        this.fetchAllBranches = this.fetchAllBranches.bind(this);
        this.fetchAllCategories = this.fetchAllCategories.bind(this);

        this.props.changePageInfo({
            currentPage: 1,
            pageSize: INTERNAL_CONFIG.PAGE_SIZE_ARR[0],
        });
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const pageIndex = Number(params.get('page'));
        const pageSize = Number(params.get('size'));
        if (
            pageIndex
            && pageSize
            && INTERNAL_CONFIG.PAGE_SIZE_ARR.indexOf(pageSize) !== -1
        ) {
            this.handleFilterChange({
                currentPage: pageIndex,
                pageSize: pageSize
            });
        } else {
            this.fetchProducts(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0], this.props.query);
            this.updateURLParams(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0]);
        }

        this.fetchAllBrands();
        this.fetchAllIndustries();
        this.fetchAllBranches();
        this.fetchAllCategories();

        console.log(this.props);
    }

    updateURLParams(currentPage, pageSize) {
        this.props.history.push({
            search: `?size=${pageSize || this.props.pageSize}&page=${currentPage || this.props.currentPage}`
        });
    }

    fetchProducts(currentPage, pageSize, query = {}) {
        this.setState({
            showLoadingBar: true,
        });

        WebService.adminGetAllProducts(AuthService.getTokenUnsafe(), (currentPage - 1) * pageSize, pageSize, query)
            .then(res => {
                const result = JSON.parse(res);
                this.props.fetchProducts(result.products);
                this.handleFilterChange({
                    totalItems: result.totalItems
                });

                this.setState({
                    showLoadingBar: false,
                });
            });
    }

    fetchAllBrands() {
        WebService.adminGetAllBrands(AuthService.getTokenUnsafe(), 10000, 0, {}).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.setState({
                    brands: result.brands
                });
            }
        })
    }

    fetchAllIndustries() {
        WebService.adminGetAllIndustries(AuthService.getTokenUnsafe(), 10000, 0, {}).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.setState({
                    industries: result.industries
                });
            }
        })
    }

    fetchAllBranches() {
        WebService.adminGetAllBranches(AuthService.getTokenUnsafe(), 10000, 0, {}).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.setState({
                    branches: result.branches
                });
            }
        })
    }

    fetchAllCategories() {
        WebService.adminGetAllCategories(AuthService.getTokenUnsafe(), 10000, 0, {}).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.setState({
                    categories: result.categories
                });
            }
        })
    }

    prepareFormData(data) {
        this.setState({
            message: ''
        });

        for (let attr in data) {
            if (!(attr in DEFAULT_FORMDATA.AdminAddProduct)) {
                data[attr + 'Id'] = data[attr].id;
                delete data[attr];
            } else if (data[attr] === null) {
                data[attr] = '';
            }
        }
        console.log(data);
        this.originalProductInfo = data;
        this.props.setFormData(data);
    }

    clearFormData() {
        this.setState({
            message: ''
        });


        this.props.setFormData(DEFAULT_FORMDATA.AdminAddProduct);
    }

    handleFilterChange({ currentPage, pageSize, totalItems }) {
        let payloadObj = {}

        if (currentPage) {
            payloadObj.currentPage = Number(currentPage);
        }

        if (pageSize) {
            payloadObj.pageSize = Number(pageSize);
        }

        if (totalItems) {
            payloadObj.totalItems = Number(totalItems);
        }

        this.props.changePageInfo(payloadObj);

        if (pageSize || currentPage) {
            this.updateURLParams(payloadObj.currentPage, payloadObj.pageSize);
            this.fetchProducts(
                payloadObj.currentPage || this.props.currentPage,
                payloadObj.pageSize || this.props.pageSize,
                this.props.query
            );
        }
    }

    handleChangeKeyword(e) {
        this.props.updateFilter({ keyword: e.target.value });
        clearTimeout(this.searchInterval);
        this.searchInterval = setTimeout(() => {
            this.handleSearch();
        }, INTERNAL_CONFIG.SEARCH_DELAY_DURATION);
    }

    handleSearch() {
        this.fetchProducts(this.props.currentPage, this.props.pageSize, this.props.query)
    }


    handleUpdateProduct() {
        return new Promise((resolve, reject) => {
            const newInfo = {};
            for (let attr in this.props.formData) {
                if (attr !== 'password' && this.props.formData[attr] !== this.originalProductInfo[attr]) {
                    newInfo[attr] = this.props.formData[attr];
                }
            }

            if (Object.keys(newInfo).length > 0) {
                this.setState({
                    message: <Message content="Updating acocunt..." />
                });

                WebService.adminUpdateProduct(AuthService.getTokenUnsafe(), this.props.formData.id, newInfo)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Update product successfully" />
                            });


                            resolve(true);
                            if ('permission' in newInfo && this.props.formData.productName === this.props.productName) {
                                window.location.reload();
                            } else {
                                this.fetchProducts(this.props.currentPage, this.props.pageSize, this.props.query);
                            }
                        } else {
                            this.setState({
                                message: <Message color="red" content={resObj.message} />
                            });
                            console.log('UPDATE FAILED', resObj);
                            resolve(false);
                        }
                    });
            } else {
                resolve(false);
                this.setState({
                    message: 'Nothing to update'
                });
            }
        });
    }

    handleAddProduct() {
        return new Promise((resolve, reject) => {
            this.setState({
                message: <Message content="Creating acocunt..." />
            });

            if (!this.props.formData.productName) {
                this.setState({
                    message: <Message color="red" content="Productname is empty" />
                });
            } else if (!this.props.formData.email) {
                this.setState({
                    message: <Message color="red" content="Email is empty" />
                });
            } else if (!this.props.formData.password) {
                this.setState({
                    message: <Message color="red" content="Password is empty" />
                });
            } else {
                WebService.adminInsertProduct(AuthService.getTokenUnsafe(), this.props.formData)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Create product successfully" />
                            });

                            resolve(true);
                            this.fetchProducts(this.props.currentPage, this.props.pageSize, this.props.query);
                        } else {
                            this.setState({
                                message: <Message color="red" content={resObj.message} />
                            });
                            console.log('ADD FAILED', resObj);
                            resolve(false);
                        }
                    });
            }
        });
    }

    handleDeleteProduct() {
        return new Promise(resolve => {
            if (this.productToBlock && this.productToBlock.id) {
                WebService.adminUpdateProduct(AuthService.getTokenUnsafe(), this.productToBlock.id, {
                    active: this.productToBlock.active === ACTIVE_TYPE.TRUE ? ACTIVE_TYPE.FALSE : ACTIVE_TYPE.TRUE
                }).then(res => {
                    const resObj = JSON.parse(res);
                    if (resObj.status === ACTIVE_TYPE.TRUE) {
                        this.setState({
                            message: <Message color="green" content={(this.productToBlock.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock') + "product successfully"} />
                        });

                        resolve(true);
                        this.fetchProducts(this.props.currentPage, this.props.pageSize, this.props.query);
                    } else {
                        this.setState({
                            message: <Message color="red" content={resObj.message} />
                        });
                        console.log('UPDATE BLOCK STATUS FAILED', resObj);
                        resolve(false);
                    }
                });
            }
        });
    }

    generateTableRows(products) {
        let r = [];

        products.forEach((product, id) => {
            let productImages = JSON.parse(product.images);
            let randomStr = HelperTool.generateRandomString();
            r.push(
                <Fragment key={id}>
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.productName}</td>
                        <td>{HelperTool.withCommas(product.price)} ₫</td>
                        <td>{product.amount}</td>
                        <td>{product.brand.brandName}</td>
                        <td>{`${product.category.categoryName}, ${product.branch.branchName}, ${product.industry.industryName}`}</td>
                        <td>{product.active === ACTIVE_TYPE.TRUE ? <i className="fa fa-check"></i> : <i className="fa fa-times-circle"></i>}</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-info btn-sm" type="button" data-toggle="collapse" data-target={"#detailbox" + randomStr} aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-info-circle"></i> Detail
                                </button>
                                <button className="btn btn-warning btn-sm" data-toggle="modal" data-target="#update-product-modal"
                                    onClick={() => this.prepareFormData({ ...product })}
                                >
                                    <i className="fa fa-pencil-square-o"></i> Edit
                                </button>
                                <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete-product-modal"
                                    onClick={() => { this.productToBlock = product; }}
                                >
                                    <i className="fa fa-ban"></i> {product.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock'}
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* ROW DETAIL */}
                    <tr className="collapse no-hover" id={"detailbox" + randomStr}>
                        <td colSpan={INTERNAL_CONFIG.MAIN_HEADERS.length}>
                            <div className="card card-body" style={{ 'border': 'none' }}>
                                <table className="table table-sm">
                                    <thead>
                                        {HelperTool.generateTableHeaders(INTERNAL_CONFIG.DETAIL_HEADERS)}
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-center">
                                                {productImages.map((imgUrl, idx) => <img key={idx} src={imgUrl} className="m-1" alt="NONE" style={{ width: 54 }} />)}
                                                <button><i className="fa fa-plus-circle"></i></button>
                                            </td>
                                            <td>{product.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </Fragment>
            )
        });

        return r;
    }

    render() {
        return (
            <div className="container-fluid">
                <Modal
                    modalId="add-product-modal"
                    modalTitle="Create new product"
                    modalBody={
                        <AdminAddProduct
                            brands={this.state.brands}
                            industries={this.state.industries}
                            branches={this.state.branches}
                            categories={this.state.categories}
                        />
                    }
                    modalHandleSubmit={this.handleAddProduct}
                    modalSubmitTitle="Add"
                    modalSubmitClassName="btn-success"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="update-product-modal"
                    modalTitle="Update product info"
                    modalBody={
                        <AdminAddProduct
                            editMode={true}
                            brands={this.state.brands}
                            industries={this.state.industries}
                            branches={this.state.branches}
                            categories={this.state.categories}
                        />
                    }
                    modalHandleSubmit={this.handleUpdateProduct}
                    modalSubmitTitle="Update"
                    modalSubmitClassName="btn-warning"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="delete-product-modal"
                    modalTitle="Update product info"
                    modalBody={<div>Are you sure to Block/Unblock this product?</div>}
                    modalHandleSubmit={this.handleDeleteProduct}
                    modalSubmitTitle="Block/Unblock"
                    modalSubmitClassName="btn-danger"
                />
                <h2>{INTERNAL_CONFIG.HEADING_NAME}</h2>
                <hr />
                <div className="card">
                    <div className="card-header d-flex justify-content-end">
                        <input className="search-bar form-control col-md-4 col-sm-6" type="text" placeholder="Search for something..."
                            value={this.props.query.keyword}
                            onChange={(e) => this.handleChangeKeyword(e)}
                            onKeyDown={(e) => e.keyCode === 13 && this.handleSearch()}
                        />
                    </div>
                    <div className="card-body">
                        <div className="controllers d-flex">
                            <div>
                                <select className="form-control input-sm"
                                    value={this.props.pageSize}
                                    onChange={(e) => {
                                        this.handleFilterChange({
                                            pageSize: e.target.value
                                        });
                                    }}
                                >
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div className="control-buttons btn-group justify-content-space-between">
                                {/* <!-- Button trigger modal --> */}
                                <button className="btn btn-success" data-toggle="modal" data-target="#add-product-modal"
                                    onClick={() => {
                                        this.clearFormData();
                                    }}
                                >
                                    <i className="fa fa-plus-circle mr-2"></i>Add product
                                </button>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <span>Display {((this.props.pageSize * this.props.currentPage) > this.props.totalItems) ? this.props.totalItems : (this.props.pageSize * this.props.currentPage)} / {this.props.totalItems}</span>
                            {/* <span>{this.state.message}</span> */}
                        </div>
                        <div className="table-container" style={{ position: 'relative' }}>
                            <div className="progress" style={{ width: '100%', height: 5, position: 'absolute' }} hidden={this.state.showLoadingBar ? "" : "hidden"}>
                                <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ "width": "100%" }}></div>
                            </div>
                            <div className="table-container table-responsive" >
                                <table className="table table-hover table-sm table-bordered">
                                    <thead className="">
                                        {HelperTool.generateTableHeaders(INTERNAL_CONFIG.MAIN_HEADERS)}
                                    </thead>
                                    <tbody>
                                        {this.generateTableRows(this.props.products)}
                                    </tbody>
                                </table>

                                <Paginator
                                    handlePageChange={(currentPage) => { this.handleFilterChange({ currentPage }) }}
                                    currentPage={this.props.currentPage}
                                    pageSize={this.props.pageSize}
                                    totalItems={this.props.totalItems}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default AdminProduct;
