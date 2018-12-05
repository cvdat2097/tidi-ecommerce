// Stylesheet
import './AdminNavBar.scss';

// External dependencies
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

// Internal dependencies
import AuthService from '../../../../services/AuthService';
import { ROUTE_NAME } from '../../../../routes/main.routing';


const INTIAL_STATE = {
    redirectTo: null
}


class AdminNavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = INTIAL_STATE;
    }

    logout() {
        AuthService.logout();
        this.setState({
            redirectTo: <Redirect to={ROUTE_NAME.LOGIN} />
        });
    }

    render() {
        return (
            <div className="nav-side-menu">
                {this.state.redirectTo}
                <h1 className="brand">ADMIN</h1>
                <p className="text-center">Hello, <strong>{this.props.username}</strong></p>
                <p className="text-center"><a href="#/" onClick={() => this.logout()}>Logout</a></p>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">
                        <li>
                            <a href="/">
                                <i className="fa fa-dashboard fa-lg"></i> Dashboard
                            </a>
                        </li>

                        <li data-toggle="collapse" data-target="#products" className="show active">
                            <a href="/"><i className="fa fa-briefcase fa-lg"></i> Management <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse show" id="products">
                            <li className="active"><Link to={ROUTE_NAME.ADMIN.USER}>User</Link></li>
                            <li><Link to={ROUTE_NAME.ADMIN.PRODUCT}>Product</Link></li>
                            <li><Link to={ROUTE_NAME.ADMIN.COUPON}>Coupon</Link></li>
                        </ul>
                    </ul>
                </div>
            </div>
        );
    }
}

export default AdminNavBar;
