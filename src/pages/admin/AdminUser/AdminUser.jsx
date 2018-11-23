import React, { Fragment } from 'react';
import './AdminUser.scss';

// import { Link } from 'react-router-dom';
// import CONSTANT from '../../../config/constants';
import AdminAddUser from './AdminAddUser';
import Modal from '../../common/Modal';
import HelperTool from '../../../helpers/lib';

import Paginator from '../../common/Paginator';

const MockUser = [{
    id: 1,
    username: 'user1',
    permission: 'admin',
    email: 'admin@vng.com.vn',
    full_name: 'Nguyen Van V',
    date_of_birth: '12/9/1878',
    phone: '09123889',
    gender: 'Nam',
    address: '78 VNG Streeet',
    is_verified: true
},
{
    id: 2,
    username: 'user2',
    permission: 'user',
    email: 'user@vng.com.vn',
    full_name: 'Nguyen Van G',
    date_of_birth: '12/9/1999',
    phone: '07890812',
    gender: 'Nu',
    address: '8776 Le Dai Hanh',
    is_verified: false
}]

export default class AdminUser extends React.Component {

    constructor(props) {
        super(props);

        this.userIdToRemove = null;

        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.prepareFormData = this.prepareFormData.bind(this);
        this.generateTableRows = this.generateTableRows.bind(this);
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

    handleUpdateUser() {
        console.log('Update a user: ');
        console.log(this.props.formData);
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
                        <td>{user.phone}</td>
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
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>

                    {/* ROW DETAIL */}
                    <tr className="collapse" id={"detailbox" + user.username}>
                        <td colSpan="6">
                            <div>
                                <div className="card card-body">
                                    <table className="table table-sm">
                                        <thead>
                                            {HelperTool.generateTableHeaders(['Full name', 'DOB', 'Gender', 'Address'])}
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{user.full_name}</td>
                                                <td>{user.date_of_birth}</td>
                                                <td>{user.gender}</td>
                                                <td>{user.address}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
                />
                <Modal
                    modalId="update-user-modal"
                    modalTitle="Update user info"
                    modalBody={<AdminAddUser />}
                    modalHandleSubmit={this.handleUpdateUser}
                    modalSubmitTitle="Update"
                    modalSubmitClassName="btn-warning"
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
                        <div className="d-flex">
                            <span>Displaying {this.props.pageSize * this.props.currentPage} / {this.props.totalItems}</span>
                        </div>
                        <div className="progress" style={{ height: 5 }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ "width": "75%" }}></div>
                        </div>
                        <div className="table-container table-responsive" >
                            <table className="table table-hover table-sm table-bordered">
                                <thead className="">
                                    {HelperTool.generateTableHeaders(['ID', 'Username', 'Role', 'Email', 'Phone', 'Actions'])}
                                </thead>
                                <tbody>
                                    {this.generateTableRows(MockUser)}
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
        );
    }
}
