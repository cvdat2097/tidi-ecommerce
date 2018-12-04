import React from 'react';
import './AdminAddUser.scss';

import { USER_TYPE, USER_GENDER } from '../../../../config/constants';

export default class AdminAddUser extends React.Component {
    render() {
        return (
            <div>
                <form >
                    {/* USERNAME */}
                    <div className="form-group">
                        <label>Username *</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Username"
                            value={this.props.formData.username}
                            onChange={(e) => this.props.updateForm({
                                username: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                        <label>Email *</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                            value={this.props.formData.email}
                            onChange={(e) => this.props.updateForm({
                                email: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* Password */}
                    {
                        !this.props.editMode ?
                            <div className="form-group">
                                <label>Password *</label>
                                <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Password"
                                    value={this.props.formData.password}
                                    onChange={(e) => this.props.updateForm({
                                        password: e.target.value
                                    })}
                                />
                                <small className="form-text text-muted"></small>
                            </div>
                            :
                            null
                    }

                    {/* Gender */}
                    <div className="form-group">
                        <label>Gender</label>
                        <select type="text" className="form-control" aria-describedby="emailHelp" placeholder="Gender"
                            value={this.props.formData.gender}
                            onChange={(e) => this.props.updateForm({
                                gender: e.target.value
                            })}
                        >
                            <option value={USER_GENDER.MALE}>{USER_GENDER.MALE}</option>
                            <option value={USER_GENDER.FEMALE}>{USER_GENDER.FEMALE}</option>
                        </select>
                    </div>


                    {/* PHONE */}
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Phone number"
                            value={this.props.formData.phone}
                            onChange={(e) => this.props.updateForm({
                                phone: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* FULL NAME */}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Fullname"
                            value={this.props.formData.fullName}
                            onChange={(e) => this.props.updateForm({
                                fullName: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* Date of Birth */}
                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input type="date" className="form-control" aria-describedby="emailHelp" placeholder="DOB"
                            value={this.props.formData.dateOfBirth}
                            onChange={(e) => this.props.updateForm({
                                dateOfBirth: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* ADDRESS */}
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Address"
                            value={this.props.formData.address}
                            onChange={(e) => this.props.updateForm({
                                address: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>

                    {/* Permission */}
                    <div className="form-group">
                        <label>Permission</label>
                        <select type="text" className="form-control" aria-describedby="emailHelp" placeholder="Permission"
                            value={this.props.formData.permission}
                            onChange={(e) => this.props.updateForm({
                                permission: e.target.value
                            })}
                        >
                            <option value={USER_TYPE.CUSTOMER}>{USER_TYPE.CUSTOMER}</option>
                            <option value={USER_TYPE.ADMIN}>{USER_TYPE.ADMIN}</option>
                        </select>
                        <small className="form-text text-muted"></small>
                    </div>
                </form>
            </div>
        );
    }
}
