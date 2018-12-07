// Stylsheet
import './AdminBrand.scss';

// External dependencies
import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';

// Internal dependencies
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
import HelperTool from '../../../helpers/lib';
import { DEFAULT_FORMDATA, ACTIVE_TYPE } from '../../../config/constants';

import Modal from '../../common/Modal';
import AdminAddBrand from './AdminAddBrand';
import Paginator from '../../common/Paginator';
import Message from '../../common/FormMessage';

const INTIAL_STATE = {
    showLoadingBar: false,
    message: '',
    brands: [],
}

const INTERNAL_CONFIG = {
    HEADING_NAME: 'Brand',
    SEARCH_DELAY_DURATION: 300,
    PAGE_SIZE_ARR: [10, 25, 50, 100],
    MAIN_HEADERS: ['ID', 'Brand Name', 'Active', 'Actions'],
}

class AdminBrand extends React.Component {
    static propTypes = {
        // currentPage: PropTypes.number,
        // pageSize: PropTypes.number,
        // totalItems: PropTypes.number,
        // fetchBrands: PropTypes.func,
        // changePageInfo: PropTypes.func,
        // query: PropTypes.shape({
        //     keyword: PropTypes.string
        // }),
        // formData: PropTypes.shape({

        // })
    }

    brandToBlock = null;
    originalBrandInfo = {};
    searchInterval = null;

    constructor(props) {
        super(props);

        this.orignalBranches = [];
        this.originalCategories = [];

        this.state = INTIAL_STATE;

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddBrand = this.handleAddBrand.bind(this);
        this.handleUpdateBrand = this.handleUpdateBrand.bind(this);
        this.handleDeleteBrand = this.handleDeleteBrand.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
        this.fetchBrands = this.fetchBrands.bind(this);

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
                pageSize: pageSize,
            });

        } else {
            this.fetchBrands(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0]);
            this.updateURLParams(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0]);
        }

        this.fetchBrands(this.props.currentPage, this.props.pageSize);
    }

    updateURLParams(currentPage, pageSize) {
        this.props.history.push({
            search: `?size=${pageSize || this.props.pageSize}&page=${currentPage || this.props.currentPage}`
        });
    }

    fetchBrands(currentPage, currentSize, query) {
        this.setState({
            showLoadingBar: true
        });

        WebService.adminGetAllBrands(AuthService.getTokenUnsafe(), currentSize, (currentPage - 1) * currentSize, query).then(res => {
            const result = JSON.parse(res);

            if (result.status && result.status.status === ACTIVE_TYPE.TRUE) {
                this.setState({
                    brands: result.brands,
                    showLoadingBar: false
                });
            }
        })
    }

    prepareFormData(data) {
        this.setState({
            message: ''
        });

        for (let attr in data) {
            if (!(attr in DEFAULT_FORMDATA.AdminAddBrand)) {
                data[attr + 'Id'] = data[attr].id;
                delete data[attr];
            } else if (data[attr] === null) {
                data[attr] = '';
            }
        }

        this.originalBrandInfo = data;
        this.props.setFormData(data);
    }

    clearFormData() {
        this.setState({
            message: ''
        });


        this.props.setFormData(DEFAULT_FORMDATA.AdminAddBrand);
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
            this.fetchBrands(
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
        this.fetchBrands(this.props.currentPage, this.props.pageSize, this.props.query)
    }

    handleUpdateBrand() {
        return new Promise((resolve, reject) => {
            const newInfo = {};
            for (let attr in this.props.formData) {
                if (this.props.formData[attr] !== this.originalBrandInfo[attr]) {
                    newInfo[attr] = this.props.formData[attr];
                }
            }

            if (Object.keys(newInfo).length > 0) {
                this.setState({
                    message: <Message content="Updating brand..." />
                });

                WebService.adminUpdateBrand(AuthService.getTokenUnsafe(), this.props.formData.id, newInfo)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Update brand successfully" />
                            });


                            resolve(true);
                            if ('permission' in newInfo && this.props.formData.brandName === this.props.brandName) {
                                window.location.reload();
                            } else {
                                this.fetchBrands(this.props.currentPage, this.props.pageSize, this.props.query);
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

    handleAddBrand() {
        return new Promise((resolve, reject) => {
            this.setState({
                message: <Message content="Creating brand..." />
            });

            if (!this.props.formData.brandName) {
                this.setState({
                    message: <Message color="red" content="Brand Name is empty" />
                });
            } else {
                WebService.adminInsertBrand(AuthService.getTokenUnsafe(), this.props.formData)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Create brand successfully" />
                            });

                            resolve(true);
                            this.fetchBrands(this.props.currentPage, this.props.pageSize, this.props.query);
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

    handleDeleteBrand() {
        return new Promise(resolve => {
            if (this.brandToBlock && this.brandToBlock.id) {
                WebService.adminUpdateBrand(AuthService.getTokenUnsafe(), this.brandToBlock.id, {
                    active: this.brandToBlock.active === ACTIVE_TYPE.TRUE ? ACTIVE_TYPE.FALSE : ACTIVE_TYPE.TRUE
                }).then(res => {
                    const resObj = JSON.parse(res);
                    if (resObj.status === ACTIVE_TYPE.TRUE) {
                        this.setState({
                            message: <Message color="green" content={(this.brandToBlock.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock') + "brand successfully"} />
                        });

                        resolve(true);
                        this.fetchBrands(this.props.currentPage, this.props.pageSize, this.props.query);
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

    generateTableRows(brands) {
        let r = [];
        brands.forEach((brand, id) => {
            r.push(
                <Fragment key={id}>
                    <tr>
                        <td>{brand.id}</td>
                        <td>{brand.brandName}</td>
                        <td>{brand.active === ACTIVE_TYPE.TRUE ? <i className="fa fa-check"></i> : <i className="fa fa-times-circle"></i>}</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-warning btn-sm" data-toggle="modal" data-target="#update-brand-modal"
                                    onClick={() => this.prepareFormData({ ...brand })}
                                >
                                    <i className="fa fa-pencil-square-o"></i> Edit
                                </button>
                                <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete-brand-modal"
                                    onClick={() => { this.brandToBlock = brand; }}
                                >
                                    <i className="fa fa-ban"></i> {brand.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock'}
                                </button>
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
                    modalId="add-brand-modal"
                    modalTitle="Create new brand"
                    modalBody={<AdminAddBrand />}
                    modalHandleSubmit={this.handleAddBrand}
                    modalSubmitTitle="Add"
                    modalSubmitClassName="btn-success"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="update-brand-modal"
                    modalTitle="Update brand info"
                    modalBody={
                        <AdminAddBrand
                            editMode={true}
                        />
                    }
                    modalHandleSubmit={this.handleUpdateBrand}
                    modalSubmitTitle="Update"
                    modalSubmitClassName="btn-warning"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="delete-brand-modal"
                    modalTitle="Update brand info"
                    modalBody={<div>Are you sure to Block/Unblock this brand?</div>}
                    modalHandleSubmit={this.handleDeleteBrand}
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
                                <button className="btn btn-success" data-toggle="modal" data-target="#add-brand-modal"
                                    onClick={() => {
                                        this.clearFormData();
                                    }}
                                >
                                    <i className="fa fa-plus-circle mr-2"></i>Add brand
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
                                        {this.generateTableRows(this.state.brands)}
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


export default AdminBrand;
