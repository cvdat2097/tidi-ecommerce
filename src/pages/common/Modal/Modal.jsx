import React from 'react';
import './Modal.scss';

// import { Link } from 'react-router-dom';
// import CONSTANT from '../../../config/constants';

// const props = {
//     modalId, modalTitle,
// }

export default class AdminAddUser extends React.Component {

    handleSubmit() {
        if (this.props.modalHandleSubmit) {
            this.props.modalHandleSubmit();
        }
    }

    handleClose() {
        if (this.props.modalHandleClose) {
            this.props.modalHandleClose();
        }
    }

    render() {
        return (
            <div>
                {/* <!-- Modal --> */}
                <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">{this.props.modalTitle}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.modalBody}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={() => this.handleClose()}
                                >Close</button>
                                <button type="button" className={"btn " + (this.props.modalSubmitClassName || "btn-success")} data-dismiss="modal"
                                    onClick={() => this.handleSubmit()}
                                >{this.props.modalSubmitTitle}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
