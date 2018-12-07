// Stylesheet
import './AdminAddBrand.scss';

// External dependencies
import React from 'react';
// import PropTypes from 'prop-types';

// Internal dependencies
import FormInput from '../../../common/FormInput';


class AdminAddBrand extends React.Component {
    static propTypes = {
        // updateForm: PropTypes.func,
        // editMode: PropTypes.bool,
        // formData: PropTypes.shape({

        // })
    }

    render() {
        return (
            <div>
                <form >
                    {/* PRODUCTNAME */}
                    <FormInput
                        label="Brand Name"
                        type="text"
                        value={this.props.formData.brandName}
                        onChangeHandler={(e) => {
                            this.props.updateForm({
                            brandName: e.target.value
                        })}}
                    />
                </form>
            </div>
        );
    }
}

export default AdminAddBrand;
