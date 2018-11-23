import React from 'react';
import './AdminUser.scss';

// import { Link } from 'react-router-dom';
// import CONSTANT from '../../../config/constants';


export default class AdminUser extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <h2>User</h2>
                <hr />
                <div className="card">
                    <div className="card-header">User list</div>
                    <div className="card-body">
                        <div className="controllers d-flex">
                            <div>
                                <select className="form-control input-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            <div className="control-buttons btn-group justify-content-space-between">
                                <button className="btn btn-success">Add</button>
                                <button className="btn btn-warning">Update</button>
                            </div>
                        </div>
                        <div className="progress" style={{ height: 5 }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ "width": "75%" }}></div>
                        </div>
                        <div className="table-container table-responsive" >
                            <table className="table table-hover table-bordered">
                                <thead className="">
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>Thornton</td>
                                        <td>
                                            <div className="btn-group">
                                                <button className="btn btn-info" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                    Detail
                                            </button>
                                                <button className="btn btn-warning">
                                                    Edit
                                            </button>
                                                <button className="btn btn-danger">
                                                    Delete
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr className="collapse" id="collapseExample">
                                        <td colSpan="5">
                                            <div>
                                                <div className="card card-body">
                                                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>
                                <ul className="pagination justify-content-center">
                                    <li className="page-item"><a className="page-link" href="/">&#60;&#60;</a></li>
                                    <li className="page-item active"><a className="page-link" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item"><a className="page-link" href="/">&#62;&#62;</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
