// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
    static propTypes = {
        type: PropTypes.string.isRequired,
        label: PropTypes.string,
        smallLabel: PropTypes.string,
        value: PropTypes.any.isRequired,
        onChangeHandler: PropTypes.func.isRequired,
        options: PropTypes.array,
        additionalClass: PropTypes.string
    }

    render() {
        const generateInput = (inputType) => {
            switch (inputType.toLowerCase()) {
                case 'select':
                    return (
                        <select type="text" className="form-control"
                            value={this.props.value}
                            onChange={this.props.onChangeHandler}
                        >
                            {this.props.options.map((opt, idx) => <option key={idx} value={opt.value || opt}>{opt.name || opt}</option>)}
                        </select>
                    );

                case 'textarea':
                    return (
                        <textarea
                            className="form-control"
                            value={this.props.value}
                            onChange={this.props.onChangeHandler}
                            rows={this.props.rows}
                        />
                    )

                default:
                    return (
                        <input
                            className="form-control"
                            type={this.props.type}
                            value={this.props.value}
                            onChange={this.props.onChangeHandler}
                        />
                    );
            }
        }

        return (
            <div className={"form-group " + this.props.additionalClass}>
                {
                    this.props.label &&
                    <label>{this.props.label}</label>
                }

                {generateInput(this.props.type)}

                {
                    this.props.smallLabel &&
                    <small className="form-text text-muted"></small>
                }
            </div>
        );
    }
}

export default FormInput;
