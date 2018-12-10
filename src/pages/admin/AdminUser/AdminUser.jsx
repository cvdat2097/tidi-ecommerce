// Stylsheet
import './AdminUser.scss';

// External dependencies
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
import HelperTool from '../../../helpers/lib';
import { DEFAULT_FORMDATA, USER_TYPE, USER_GENDER, ACTIVE_TYPE } from '../../../config/constants';

import Modal from '../../common/Modal';
import AdminAddUser from './AdminAddUser';
import Paginator from '../../common/Paginator';
import Message from '../../common/FormMessage';

const INTIAL_STATE = {
    showLoadingBar: false,
    message: '',
}

const INTERNAL_CONFIG = {
    HEADING_NAME: 'User',
    SEARCH_DELAY_DURATION: 300,
    PAGE_SIZE_ARR: [10, 25, 50, 100],
    MAIN_HEADERS: ['ID', 'Username', 'Role', 'Email', 'Active', 'Actions'],
    DETAIL_HEADERS: ['Avatar', 'Full name', 'Phone', 'DOB', 'Gender', 'Address'],
}

class AdminUser extends React.Component {
    static propTypes = {
        currentPage: PropTypes.number,
        pageSize: PropTypes.number,
        totalItems: PropTypes.number,
        fetchUsers: PropTypes.func,
        changePageInfo: PropTypes.func,
        query: PropTypes.shape({
            keyword: PropTypes.string
        }),
        formData: PropTypes.shape({
            username: PropTypes.string,
            permission: PropTypes.oneOf([USER_TYPE.ADMIN, USER_TYPE.PUBLIC, USER_TYPE.CUSTOMER]),
            email: PropTypes.string,
            fullName: PropTypes.string,
            dateOfBirth: PropTypes.string,
            phone: PropTypes.string,
            gender: PropTypes.oneOf([USER_GENDER.MALE, USER_GENDER.FEMALE]),
            address: PropTypes.string,
            active: PropTypes.oneOf([ACTIVE_TYPE.TRUE, ACTIVE_TYPE.FALSE]),
            password: PropTypes.string,
        })
    }

    userToBlock = null;
    originalAccountInfo = {};
    searchInterval = null;
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);

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
            this.fetchUsers(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0], this.props.query);
            this.updateURLParams(this.props.currentPage, INTERNAL_CONFIG.PAGE_SIZE_ARR[0]);
        }
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateURLParams(currentPage, pageSize) {
        this.props.history.push({
            search: `?size=${pageSize || this.props.pageSize}&page=${currentPage || this.props.currentPage}`
        });
    }

    fetchUsers(currentPage, pageSize, query = {}) {
        this.setState({
            showLoadingBar: true,
        });

        WebService.adminGetAllAccounts(AuthService.getTokenUnsafe(), (currentPage - 1) * pageSize, pageSize, query)
            .then(res => {
                const result = JSON.parse(res);
                this.props.fetchUsers(result.accounts);
                this.handleFilterChange({
                    totalItems: result.totalItems
                });


                if (this._isMounted) {
                    this.setState({
                        showLoadingBar: false,
                    });
                }
            });
    }

    prepareFormData(data) {
        this.setState({
            message: ''
        });

        for (let attr in data) {
            if (!(attr in DEFAULT_FORMDATA.AdminAddUser)) {
                delete data[attr];
            } else if (data[attr] === null) {
                data[attr] = '';
            }
        }
        this.originalAccountInfo = data;
        this.props.setFormData(data);
    }

    clearFormData() {
        this.setState({
            message: ''
        });


        this.props.setFormData(DEFAULT_FORMDATA.AdminAddUser);
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
            this.fetchUsers(
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
        this.fetchUsers(this.props.currentPage, this.props.pageSize, this.props.query)
    }


    handleUpdateUser() {
        return new Promise((resolve, reject) => {
            const newInfo = {};
            for (let attr in this.props.formData) {
                if (attr !== 'password' && this.props.formData[attr] !== this.originalAccountInfo[attr]) {
                    newInfo[attr] = this.props.formData[attr];
                }
            }

            if (Object.keys(newInfo).length > 0) {
                this.setState({
                    message: <Message content="Updating acocunt..." />
                });

                WebService.adminUpdateAccount(AuthService.getTokenUnsafe(), this.props.formData.id, newInfo)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Update account successfully" />
                            });


                            resolve(true);
                            if ('permission' in newInfo && this.props.formData.username === this.props.username) {
                                window.location.reload();
                            } else {
                                this.fetchUsers(this.props.currentPage, this.props.pageSize, this.props.query);
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

    handleAddUser() {
        return new Promise((resolve, reject) => {
            this.setState({
                message: <Message content="Creating acocunt..." />
            });

            if (!this.props.formData.username) {
                this.setState({
                    message: <Message color="red" content="Username is empty" />
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
                WebService.adminCreateAccount(AuthService.getTokenUnsafe(), this.props.formData)
                    .then(res => {
                        const resObj = JSON.parse(res);
                        if (resObj.status === ACTIVE_TYPE.TRUE) {
                            this.setState({
                                message: <Message color="green" content="Create account successfully" />
                            });

                            resolve(true);
                            this.fetchUsers(this.props.currentPage, this.props.pageSize, this.props.query);
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

    handleDeleteUser() {
        return new Promise(resolve => {
            if (this.userToBlock && this.userToBlock.id) {
                WebService.adminUpdateAccount(AuthService.getTokenUnsafe(), this.userToBlock.id, {
                    active: this.userToBlock.active === ACTIVE_TYPE.TRUE ? ACTIVE_TYPE.FALSE : ACTIVE_TYPE.TRUE
                }).then(res => {
                    const resObj = JSON.parse(res);
                    if (resObj.status === ACTIVE_TYPE.TRUE) {
                        this.setState({
                            message: <Message color="green" content={(this.userToBlock.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock') + "account successfully"} />
                        });

                        resolve(true);
                        this.fetchUsers(this.props.currentPage, this.props.pageSize, this.props.query);
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

    generateTableRows(users) {
        let r = [];

        users.forEach((user, id) => {
            r.push(
                <Fragment key={id}>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.permission}</td>
                        <td>{user.email}</td>
                        <td>{user.active === ACTIVE_TYPE.TRUE ? <i className="fa fa-check"></i> : <i className="fa fa-times-circle"></i>}</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-info btn-sm" type="button" data-toggle="collapse" data-target={"#detailbox" + user.username} aria-expanded="false" aria-controls="collapseExample">
                                    <i className="fa fa-info-circle"></i> Detail
                                </button>
                                <button className="btn btn-warning btn-sm" data-toggle="modal" data-target="#update-user-modal"
                                    onClick={() => this.prepareFormData(user)}
                                >
                                    <i className="fa fa-pencil-square-o"></i> Edit
                                </button>
                                <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete-user-modal"
                                    onClick={() => { this.userToBlock = user; }}
                                >
                                    <i className="fa fa-ban"></i> {user.active === ACTIVE_TYPE.TRUE ? 'Block' : 'Unblock'}
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* ROW DETAIL */}
                    <tr className="collapse no-hover" id={"detailbox" + user.username}>
                        <td colSpan={INTERNAL_CONFIG.MAIN_HEADERS.length}>
                            <div className="card card-body" style={{ 'border': 'none' }}>
                                <table className="table table-sm">
                                    <thead>
                                        {HelperTool.generateTableHeaders(INTERNAL_CONFIG.DETAIL_HEADERS)}
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><img src={user.avatar ? user.avatar : 'http://bestnycacupuncturist.com/wp-content/uploads/2016/11/anonymous-avatar-sm.jpg'} alt="NONE" style={{ width: 40 }} /></td>
                                            <td>{user.fullName}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.dateOfBirth}</td>
                                            <td>{user.gender}</td>
                                            <td>{user.address}</td>
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
                    modalId="add-user-modal"
                    modalTitle="Create new user"
                    modalBody={<AdminAddUser />}
                    modalHandleSubmit={this.handleAddUser}
                    modalSubmitTitle="Add"
                    modalSubmitClassName="btn-success"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="update-user-modal"
                    modalTitle="Update user info"
                    modalBody={<AdminAddUser editMode={true} />}
                    modalHandleSubmit={this.handleUpdateUser}
                    modalSubmitTitle="Update"
                    modalSubmitClassName="btn-warning"
                    modalMessage={this.state.message}
                />
                <Modal
                    modalId="delete-user-modal"
                    modalTitle="Update user info"
                    modalBody={<div>Are you sure to Block/Unblock this user?</div>}
                    modalHandleSubmit={this.handleDeleteUser}
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
                                <button className="btn btn-success" data-toggle="modal" data-target="#add-user-modal"
                                    onClick={() => {
                                        this.clearFormData();
                                    }}
                                >
                                    <i className="fa fa-plus-circle mr-2"></i>Add user
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
                                        {this.generateTableRows(this.props.users)}
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


export default AdminUser;
