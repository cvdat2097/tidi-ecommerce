import React from 'react';
import { Link } from 'react-router-dom';

import { ROUTE_NAME } from '../../../routes/main.routing';

const INITIAL_STATE = {
    email: ''
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;
    }

    handleEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    handleReset() {
        console.log(this.state);
    }

    render() {
        return (
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src="/img/img-01.png" alt="IMG" />
                        </div>

                        <form className="login100-form validate-form">
                            <span className="login100-form-title">Reset Password</span>

                            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                                <input className="input100" type="text" name="email" placeholder="Email"
                                    onChange={(e) => { this.handleEmailChange(e) }}
                                    value={this.state.email}
                                />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                </span>
                            </div>

                            <div className="container-login100-form-btn">
                                <button type="button" className="login100-form-btn"
                                    onClick={() => this.handleReset()}
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
                    </div>
                </div>
            </div>
        );
    }
}