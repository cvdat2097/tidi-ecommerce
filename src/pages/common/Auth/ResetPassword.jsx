// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Internal Dependencies
import { ROUTE_NAME } from '../../../routes/main.routing';
import WebService from '../../../services/WebService';
import { ACTIVE_TYPE } from '../../../config/constants';


const INITIAL_STATE = {
    username: '',
    password1: '',
    password2: '',
    verificationCode: '',
    message: '',
    messageColor: 'red',
    showNewPasswordForm: false
}

class ResetPassword extends React.Component {
    static propTypes = {
        // NONE
    }

    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    handleEmailChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePassword1Change(e) {
        this.setState({
            password1: e.target.value
        });
    }

    handlePassword2Change(e) {
        this.setState({
            password2: e.target.value
        });
    }

    handleVerificationCodeChange(e) {
        this.setState({
            verificationCode: e.target.value
        });
    }

    handleReset($event) {
        $event.preventDefault();

        if (this.state.username.length) {
            WebService.resetPassword(this.state.username).then(res => {
                const result = JSON.parse(res);

                if (result.status === ACTIVE_TYPE.TRUE) {
                    this.setState({
                        message: 'Reset code has been sent to your email.',
                        messageColor: 'green',
                        showNewPasswordForm: true
                    })
                } else {
                    this.setState({
                        message: "Username is invalid",
                        messageColor: 'red'
                    })
                }
            })
        }
    }

    handleUpdateNewPassword() {
        if (this.state.password1 !== this.state.password2) {
            this.setState({
                message: 'Passwords mismatch!',
                messageColor: 'red'
            });
        } else if (this.state.verificationCode.length <= 0) {
            this.setState({
                message: 'Please enter verification code',
                messageColor: 'red'
            });
        } else {
            WebService.verifyEmailResetPassword(this.state.verificationCode, this.state.password1).then(res => {
                const result = JSON.parse(res);

                if (result.status === ACTIVE_TYPE.TRUE) {                    
                    this.setState({
                        message: 'Password changed! You can now login',
                        messageColor: 'green'
                    });  
                } else {
                    this.setState({
                        message: 'Verification code is incorrect!',
                        messageColor: 'red'
                    });
                }
                
            })
        }
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="/img/img-01.png" alt="IMG" />
                        </div>

                        {/* RESET FORM */}
                        {
                            !this.state.showNewPasswordForm &&
                            <form className="login100-form validate-form">
                                <span className="login100-form-title">Reset Password</span>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" placeholder="Username" autoComplete="off"
                                        onChange={(e) => { this.handleEmailChange(e) }}
                                        value={this.state.username}
                                        onKeyDown={(e) => e.keyCode === 13 && this.handleReset(e)}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className="d-flex justify-content-center" style={{ height: 20, margin: 0, textAlign: 'center', color: this.state.messageColor }}>
                                    {' ' + this.state.message}
                                </div>

                                <div className="container-login100-form-btn">
                                    <button type="button" className="login100-form-btn"
                                        onClick={(e) => this.handleReset(e)}
                                    >Reset</button>
                                </div>

                                <div className="text-center p-t-12">
                                    <span className="txt1"></span>
                                    <Link to={ROUTE_NAME.LOGIN} className="txt2" href="/">Login Again</Link>
                                </div>

                                <div className="text-center p-t-136">
                                    <Link to={ROUTE_NAME.REGISTER} className="txt2" >
                                        Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </form>
                        }


                        {/* NEW PASSWORD FORM */}
                        {
                            this.state.showNewPasswordForm &&
                            <form className="login100-form validate-form">
                                <span className="login100-form-title">Enter New Password</span>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" placeholder="Password" autoComplete="off"
                                        onChange={(e) => { this.handlePassword1Change(e) }}
                                        value={this.state.password1}
                                        onKeyDown={(e) => e.keyCode === 13 && this.handlePassword1Change(e)}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="password" placeholder="Password again" autoComplete="off"
                                        onChange={(e) => { this.handlePassword2Change(e) }}
                                        value={this.state.password2}
                                        onKeyDown={(e) => e.keyCode === 13 && this.handlePassword2Change(e)}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-lock" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className="wrap-input100 validate-input">
                                    <input className="input100" type="text" placeholder="Verification Code" autoComplete="off"
                                        onChange={(e) => { this.handleVerificationCodeChange(e) }}
                                        value={this.state.verificationCode}
                                        onKeyDown={(e) => e.keyCode === 13 && this.handlePassword2Change(e)}
                                    />
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="fa fa-barcode" aria-hidden="true"></i>
                                    </span>
                                </div>

                                <div className="d-flex justify-content-center" style={{ height: 20, margin: 0, textAlign: 'center', color: this.state.messageColor }}>
                                    {' ' + this.state.message}
                                </div>

                                <div className="container-login100-form-btn">
                                    <button type="button" className="login100-form-btn"
                                        onClick={(e) => (!this.state.showNewPasswordForm ? this.handleReset(e) : this.handleUpdateNewPassword())}
                                    >{!this.state.showNewPasswordForm ? 'Reset' : 'Change'}</button>
                                </div>

                                <div className="text-center p-t-12">
                                    <span className="txt1"></span>
                                    <Link to={ROUTE_NAME.LOGIN} className="txt2" href="/">Login Again</Link>
                                </div>

                                <div className="text-center p-t-136">
                                    <Link to={ROUTE_NAME.REGISTER} className="txt2" >
                                        Create your Account
                                <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
                                    </Link>
                                </div>
                            </form>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ResetPassword;
