import React from 'react';
import './AdminNavBar.scss';

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
                            <a href="/"><i className="fa fa-gift fa-lg"></i> UI Elements <span className="arrow"></span></a>
                        </li>
                        <ul className="sub-menu collapse" id="products">
                            <li className="active"><a href="/">CSS3 Animation</a></li>
                            <li><a href="/">General</a></li>
                            <li><a href="/">Buttons</a></li>
                            <li><a href="/">Tabs & Accordions</a></li>
                            <li><a href="/">Typography</a></li>
                            <li><a href="/">FontAwesome</a></li>
                            <li><a href="/">Slider</a></li>
                            <li><a href="/">Panels</a></li>
                            <li><a href="/">Widgets</a></li>
                            <li><a href="/">Bootstrap Model</a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        );
    }
}
