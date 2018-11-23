import React from 'react';
import './AdminAddUser.scss';

// import { Link } from 'react-router-dom';
// import CONSTANT from '../../../config/constants';


export default class AdminAddUser extends React.Component {
    render() {
        return (
            <div>
                <form >
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                            value={this.props.formData.name}
                            onChange={(e) => this.props.updateForm({
                                name: e.target.value
                            })}
                        />
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                            value={this.props.formData.age}
                            onChange={(e) => this.props.updateForm({
                                age: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>
                </form>
            </div>
        );
    }
}
