// External Dependencies
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Moment from 'moment';

// Internal Dependencies
import { ROUTE_NAME } from '../../../routes/main.routing';
import AuthService from '../../../services/AuthService';
import WebService from '../../../services/WebService';
import CONSTANT from '../../../config/constants';

const INITIAL_STATE = {
    username: '',
    password: '',
    passwordConf: '',
    name: '',
    email: '',
    phone: null, // FIXME: change to type string
    dob: '',
    gender: null,
    address: '',
    avatar: '',

    redirectTo: null,
    message: ''
}

class Register extends React.Component {
    static propTypes = {
        // NONE
    }

    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.handleRegister = this.handleRegister.bind(this);
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handlePasswordConfChange(e) {
        this.setState({
            passwordConf: e.target.value
        });
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleDOBChange(e) {
        this.setState({
            dob: e.target.value
        });
    }

    handleRegister() {
        if (this.state.password === this.state.passwordConf) {
            this.setState({
                message: ''
            });

            // DOB format process
            if (this.state.email.match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([a-zA-Z0-9-]+.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) != null) {

                if (this.state.password && this.state.username && this.state.email) {

                    WebService.register(this.state.username,
                        this.state.password,
                        this.state.email,
                        this.state.name,
                        Moment(this.state.dob).format(CONSTANT.DATE_FORMAT).toString(),
                        this.state.phone,
                        this.state.gender,
                        this.state.address,
                        this.state.avatar)
                        .then(res => {
                            let resObj = JSON.parse(res);

                            if (resObj.status.status === 'TRUE') {
                                AuthService.saveToken(resObj.token);
                                this.setState({
                                    redirectTo: <Redirect to={ROUTE_NAME.HOME} />
                                });
                            } else {
                                this.setState({
                                    message: resObj.status.message
                                })
                            }
                        });
                } else {
                    this.setState({
                        message: 'Information is missing.'
                    });
                }
            } else {
                this.setState({
                    message: 'Valid email is required: ex@abc.xyz'
                });
            }
        } else {
            this.setState({
                message: 'Passwords mismatch'
            });
        }
    }

    render() {
        return (
            <div className="limiter">
                {this.state.redirectTo}
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="/img/img-01.png" alt="IMG" />
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">Member Registration</span>

                            {/* Username */}
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className={"input100" + (this.state.message ? " is-invalid" : "")} type="text" name="email" placeholder="Username" autoComplete="off"
                                    onChange={(e) => { this.handleUsernameChange(e) }}
                                    value={this.state.username}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* Password */}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className={"input100" + (this.state.message ? " is-invalid" : "")} type="password" name="pass" placeholder="Password" autoComplete="off"
                                    onChange={(e) => { this.handlePasswordChange(e) }}
                                    value={this.state.password}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* Confirm password */}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className={"input100" + (this.state.message ? " is-invalid" : "")} type="password" name="pass" placeholder="Confirm Password" autoComplete="off"
                                    onChange={(e) => { this.handlePasswordConfChange(e) }}
                                    value={this.state.passwordConf}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* Email */}
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className={"input100" + (this.state.message ? " is-invalid" : "")} type="text" name="pass" placeholder="Email address" autoComplete="off"
                                    onChange={(e) => { this.handleEmailChange(e) }}
                                    value={this.state.email}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* Name */}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="text" name="pass" placeholder="Full Name" autoComplete="off"
                                    onChange={(e) => { this.handleNameChange(e) }}
                                    value={this.state.name}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-address-card" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* DOB */}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="date" name="pass" placeholder="Date of Birth" autoComplete="off"
                                    onChange={(e) => { this.handleDOBChange(e) }}
                                    value={this.state.dob}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-address-card" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="d-flex justify-content-center" style={{ color: 'red', height: 20, margin: 0 }}>
                                {' ' + this.state.message}
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn"
                                    onClick={() => this.handleRegister()}
                                >Register</button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">Forgot </span>
                                <Link to={ROUTE_NAME.RESET_PASSWORD} className="txt2" >Username / Password?</Link>
                            </div>

                            <div className="text-center p-t-136">
                                <span className="txt1">Already have an account?  </span>
                                <Link to={ROUTE_NAME.LOGIN} className="txt2">
                                    Login
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;
