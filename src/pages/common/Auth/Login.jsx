

import React from 'react';

const INITIAL_STATE = {
    username: '',
    password: ''
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

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
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
                            <span className="login100-form-title">Member Login</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email"
                                    onChange={(e) => { this.handleUsernameChange(e) }}
                                    value={this.state.username}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

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

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn"
                                    onClick={() => this.handleLogin()}
                                >Login</button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">Forgot </span>
                                <a className="txt2" href="/">Username / Password?</a>
                            </div>

                            <div className="text-center p-t-136">
                                <a className="txt2" href="/">
                                    Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}