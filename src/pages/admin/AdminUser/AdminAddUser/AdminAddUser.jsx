import React from 'react';
import './AdminAddUser.scss';


export default class AdminAddUser extends React.Component {
    render() {
        return (
            <div>
                <form >
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                            value={this.props.formData.username}
                            onChange={(e) => this.props.updateForm({
                                username: e.target.value
                            })}
                        />
                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"
                            value={this.props.formData.email}
                            onChange={(e) => this.props.updateForm({
                                email: e.target.value
                            })}
                        />
                        <small className="form-text text-muted"></small>
                    </div>
                </form>
            </div>
        );
    }
}
