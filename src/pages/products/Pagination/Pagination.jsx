import React from 'react';
import './Pagination.scss';



export default class Pagination extends React.Component {
    render() {
        return (
            <div>
                < nav aria-label="navigation" >
                    <ul className="pagination mt-50 mb-70">
                        <li className="page-item"><a className="page-link" href="/"><i className="fa fa-angle-left"></i></a></li>
                        <li className="page-item"><a className="page-link" href="/">1</a></li>
                        <li className="page-item"><a className="page-link" href="/">2</a></li>
                        <li className="page-item"><a className="page-link" href="/">3</a></li>
                        <li className="page-item"><a className="page-link" href="/">...</a></li>
                        <li className="page-item"><a className="page-link" href="/">21</a></li>
                        <li className="page-item"><a className="page-link" href="/"><i className="fa fa-angle-right"></i></a></li>
                    </ul>
                </nav >
            </div>
        );
    }
}
