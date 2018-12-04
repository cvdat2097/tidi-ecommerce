import React from 'react';
import './Modal.scss';

export default class AdminAddUser extends React.Component {

    handleSubmit() {
        if (this.props.modalHandleSubmit) {
            this.props.modalHandleSubmit().then(success => {
                if (success) {
                    this.hideModal();
                }
            }).catch(res => {
                this.hideModal();
            });
        }
    }

    handleClose() {
        if (this.props.modalHandleClose) {
            this.props.modalHandleClose();
        }
    }

    hideModal() {
        window.$('#' + this.props.modalId).modal('hide');
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
                                <span className="mr-auto">{this.props.modalMessage}</span>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                    onClick={() => this.handleClose()}
                                >Close</button>
                                <button type="button" className={"btn " + (this.props.modalSubmitClassName || "btn-success")}
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
