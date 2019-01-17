// Stylesheet
import './AdminAddUser.scss';

// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import { USER_TYPE, USER_GENDER, ACTIVE_TYPE } from '../../../../config/constants';

import FormInput from '../../../common/FormInput';


class AdminAddUser extends React.Component {
    static propTypes = {
        updateForm: PropTypes.func,
        editMode: PropTypes.bool,
        formData: PropTypes.shape({
            username: PropTypes.string,
            permission: PropTypes.oneOf([USER_TYPE.ADMIN, USER_TYPE.PUBLIC, USER_TYPE.CUSTOMER]),
            email: PropTypes.string,
            fullName: PropTypes.string,
            dateOfBirth: PropTypes.string,
            phone: PropTypes.string,
            gender: PropTypes.oneOf([USER_GENDER.MALE, USER_GENDER.FEMALE, '']),
            address: PropTypes.string,
            active: PropTypes.oneOf([ACTIVE_TYPE.TRUE, ACTIVE_TYPE.FALSE]),
            password: PropTypes.string,
        })
    }

    render() {
        return (
            <div>
                <form >
                    {/* USERNAME */}
                    <FormInput
                        label="Username"
                        type="text"
                        value={this.props.formData.username}
                        onChangeHandler={(e) => this.props.updateForm({
                            username: e.target.value
                        })}
                    />

                    {/* EMAIL */}
                    <FormInput
                        label="Email"
                        type="text"
                        value={this.props.formData.email}
                        onChangeHandler={(e) => this.props.updateForm({
                            email: e.target.value
                        })}
                    />

                    {/* Password */}
                    {
                        !this.props.editMode &&
                        <FormInput
                            label="Password"
                            type="text"
                            value={this.props.formData.password}
                            onChangeHandler={(e) => this.props.updateForm({
                                password: e.target.value
                            })}
                        />
                    }

                    {/* Gender */}
                    <FormInput
                        label="Gender"
                        type="select"
                        value={this.props.formData.gender}
                        onChangeHandler={(e) => this.props.updateForm({
                            gender: e.target.value
                        })}
                        options={[USER_GENDER.FEMALE, USER_GENDER.MALE]}
                    />

                    {/* PHONE */}
                    <FormInput
                        label="Phone"
                        type="text"
                        value={this.props.formData.phone}
                        onChangeHandler={(e) => this.props.updateForm({
                            phone: e.target.value
                        })}
                    />

                    {/* FULL NAME */}
                    <FormInput
                        label="Full name"
                        type="text"
                        value={this.props.formData.fullName}
                        onChangeHandler={(e) => this.props.updateForm({
                            fullName: e.target.value
                        })}
                    />

                    {/* Date of Birth */}
                    <FormInput
                        label="Date of Birth"
                        type="date"
                        value={this.props.formData.dateOfBirth}
                        onChangeHandler={(e) => this.props.updateForm({
                            dateOfBirth: e.target.value
                        })}
                    />

                    {/* ADDRESS */}
                    <FormInput
                        label="Address"
                        type="text"
                        value={this.props.formData.address}
                        onChangeHandler={(e) => this.props.updateForm({
                            address: e.target.value
                        })}
                    />

                    {/* Permission */}
                    <FormInput
                        label="Permission"
                        type="select"
                        value={this.props.formData.permission}
                        onChangeHandler={(e) => this.props.updateForm({
                            permission: e.target.value
                        })}
                        options={[USER_TYPE.CUSTOMER, USER_TYPE.ADMIN]}
                    />

                </form>
            </div>
        );
    }
}

export default AdminAddUser;
