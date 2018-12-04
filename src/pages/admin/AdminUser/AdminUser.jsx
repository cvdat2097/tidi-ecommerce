import React, { Fragment } from 'react';
import './AdminUser.scss';

import WebService from '../../../services/WebService';
import AuthService from '../../../services/AuthService';
import AdminAddUser from './AdminAddUser';
import Modal from '../../common/Modal';
import HelperTool from '../../../helpers/lib';

import Paginator from '../../common/Paginator';

const INTIAL_STATE = {
    showLoadingBar: false,
    message: ''
}

export default class AdminUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;

        this.userIdToRemove = null;
        this.originalAccountInfo = {};

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const pageIndex = Number(params.get('page'));
        const pageSize = Number(params.get('size'));
        if (
            pageIndex
            && pageSize
            && [3, 10, 25, 50, 100].indexOf(pageSize) !== -1
        ) {
            this.handleFilterChange({
                currentPage: pageIndex,
                pageSize: pageSize
            });
        } else {
            this.fetchUsers(this.props.currentPage, this.props.pageSize);
            this.updateURLParams(this.props.currentPage, this.props.pageSize);
        }
    }

    updateURLParams(currentPage, pageSize) {
        this.props.history.push({
            search: `?size=${pageSize || this.props.pageSize}&page=${currentPage || this.props.currentPage}`
        });
    }

    fetchUsers(currentPage, pageSize) {
        // let offset = (this.props.currentPage - 1) * this.props.pageSize;
        // let limit = this.props.pageSize;
        this.setState({
            showLoadingBar: true,
        });
        WebService.adminGetAllAccounts(AuthService.getTokenUnsafe(), (currentPage - 1) * pageSize, pageSize, {})
            .then(res => {
                const result = JSON.parse(res);
                console.log('ADMIN USERS', result);
                this.props.fetchUsers(result.accounts);
                this.handleFilterChange({
                    totalItems: result.totalItems
                });

                this.setState({
                    showLoadingBar: false,
                });
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
            this.fetchUsers(
                payloadObj.currentPage || this.props.currentPage,
                payloadObj.pageSize || this.props.pageSize
            );
        }
    }

    handleUpdateUser() {
        return new Promise((resolve, reject) => {
            console.log('Before', this.originalAccountInfo);
            console.log(this.props.formData);

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
                        if (resObj.status === 'TRUE') {
                            this.setState({
                                message: <Message color="green" content="Update account successfully" />
                            });
                            this.fetchUsers(this.props.currentPage, this.props.pageSize);

                            resolve(true);
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
                })
            }
        });
    }

    handleAddUser() {
        console.log("Added a new user");
        console.log(this.props.formData);
    }

    handleDeleteUser() {
        if (this.userIdToRemove) {
            console.log('Deleted user ' + this.userIdToRemove);
        }
    }

    prepareFormData(data) {
        for (let attr in data) {
            if (data[attr] === null) {
                data[attr] = '';
            }
        }
        this.originalAccountInfo = data;
        this.props.setFormData(data);
    }

    clearFormData() {
        let clearObj = {};
        for (let attr in this.props.formData) {
            clearObj[attr] = "";
        }
        this.props.setFormData(clearObj);
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
                        <td>{user.active === 'TRUE' ? <i className="fa fa-check"></i> : <i className="fa fa-times-circle"></i>}</td>
                        <td>
                            <div className="btn-group">
                                <button className="btn btn-info btn-sm" type="button" data-toggle="collapse" data-target={"#detailbox" + user.username} aria-expanded="false" aria-controls="collapseExample">
                                    Detail
                                </button>
                                <button className="btn btn-warning btn-sm" data-toggle="modal" data-target="#update-user-modal"
                                    onClick={() => this.prepareFormData(user)}
                                >
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete-user-modal"
                                    onClick={() => { this.userIdToRemove = user.id; }}
                                >
                                    {user.active === 'TRUE' ? 'Block' : 'Unblock'}
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* ROW DETAIL */}
                    <tr className="collapse no-hover" id={"detailbox" + user.username}>
                        <td colSpan="7">
                            <div className="card card-body" style={{ 'border': 'none' }}>
                                <table className="table table-sm">
                                    <thead>
                                        {HelperTool.generateTableHeaders(['Avatar', 'Full name', 'Phone', 'DOB', 'Gender', 'Address'])}
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
                    modalBody={<div>Are you sure to delete this user?</div>}
                    modalHandleSubmit={this.handleDeleteUser}
                    modalSubmitTitle="Delete"
                    modalSubmitClassName="btn-danger"
                />
                <h2>User</h2>
                <hr />
                <div className="card">
                    <div className="card-header">User list</div>
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
                                    <option value="3">3</option>
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
                                    Add user
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
                                        {HelperTool.generateTableHeaders(['ID', 'Username', 'Role', 'Email', 'Active', 'Actions'])}
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

function Message(props) {
    return <span style={{ color: props.color }}>{props.content}</span>
}
