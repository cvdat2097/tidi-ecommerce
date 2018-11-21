import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANT from '../../../config/constants';

const INITIAL_STATE = {
    username: '',
    password: '',
    passwordConf: '',
    name: '',
    email: '',
    dob: null
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
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

    handleLogin() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="img/img-01.png" alt="IMG" />
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">Member Registration</span>

                            {/* Username */}
                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Username"
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
                                <input className="input100" type="password" name="pass" placeholder="Password"
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
                                <input className="input100" type="password" name="pass" placeholder="Confirm Password"
                                    onChange={(e) => { this.handlePasswordConfChange(e) }}
                                    value={this.state.passwordConf}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            {/* Email */}
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="text" name="pass" placeholder="Email address"
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
                                <input className="input100" type="text" name="pass" placeholder="Full Name"
                                    onChange={(e) => { this.handleNameChange(e) }}
                                    value={this.state.name}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-address-card" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn"
                                    onClick={() => this.handleLogin()}
                                >Register</button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">Forgot </span>
                                <Link to={CONSTANT.ROUTE.RESET_PASSWORD} className="txt2" >Username / Password?</Link>
                            </div>

                            <div className="text-center p-t-136">
                                <span className="txt1">Already have an account?  </span>
                                <Link to={CONSTANT.ROUTE.LOGIN} className="txt2">
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