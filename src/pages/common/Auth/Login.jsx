// External Dependencies
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Internal Dependencies
import { ROUTE_NAME } from '../../../routes/main.routing';
import AuthService from '../../../services/AuthService';

const INITIAL_STATE = {
    username: '',
    password: '',
    redirectTo: null,
    message: ''
}

class Login extends React.Component {
    static propTypes = {
        changeLoginStatus: PropTypes.func
    }

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
        AuthService.login(this.state.username, this.state.password).then(loggedInSuccess => {
            if (loggedInSuccess === true) {
                this.props.changeLoginStatus(true);
                this.setState({
                    redirectTo: <Redirect to={ROUTE_NAME.HOME} />
                })
            } else {
                this.setState({
                    message: 'Username or password is incorrect'
                });
            }
        });
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
                            <span className="login100-form-title">Member Login</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Username" autoComplete="off"
                                    onChange={(e) => { this.handleUsernameChange(e) }}
                                    value={this.state.username}
                                    onKeyDown={(e) => e.keyCode === 13 && this.handleLogin()}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" placeholder="Password" autoComplete="off"
                                    onChange={(e) => { this.handlePasswordChange(e) }}
                                    value={this.state.password}
                                    onKeyDown={(e) => e.keyCode === 13 && this.handleLogin()}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-lock" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="d-flex justify-content-center" style={{ color: 'red', height: 20, margin: 0 }}>
                                {' ' + this.state.message}
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn"
                                    onClick={() => this.handleLogin()}
                                >Login</button>
                            </div>

                            <div className="text-center p-t-12">
                                <span className="txt1">Forgot </span>
                                <Link to={ROUTE_NAME.RESET_PASSWORD} className="txt2">Username / Password?</Link>
                            </div>

                            <div className="text-center p-t-136">
                                <Link to={ROUTE_NAME.REGISTER} className="txt2">
                                    Create your Account
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

export default Login;
