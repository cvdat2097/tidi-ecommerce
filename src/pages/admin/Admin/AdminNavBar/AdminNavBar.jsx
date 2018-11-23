import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavBar.scss';

import CONSTANT from '../../../../config/constants';

export default class AdminNavBar extends React.Component {
    render() {
        return (
            <div className="nav-side-menu">
                <h1 className="brand">ADMIN</h1>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">
                        <li>
                            <a href="/">
                                <i className="fa fa-dashboard fa-lg"></i> Dashboard
                            </a>
                        </li>

                        <li data-toggle="collapse" data-target="#products" className="collapsed active">
                            <a href="/"><i className="fa fa-gift fa-lg"></i> Management <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="products">
                            <li className="active"><Link to={CONSTANT.ROUTE.ADMIN.USER}>User</Link></li>
                            <li><Link to={CONSTANT.ROUTE.ADMIN.PRODUCT}>Product</Link></li>
                            <li><Link to={CONSTANT.ROUTE.ADMIN.COUPON}>Coupon</Link></li>
                        </ul>
                    </ul>
                </div>
            </div>
        );
    }
}
