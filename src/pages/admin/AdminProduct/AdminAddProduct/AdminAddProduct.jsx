// Stylesheet
import './AdminAddProduct.scss';

// External dependencies
import React from 'react';
// import PropTypes from 'prop-types';

// Internal dependencies
// import { ACTIVE_TYPE } from '../../../../config/constants';

import FormInput from '../../../common/FormInput';


class AdminAddProduct extends React.Component {
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
                        label="Productname"
                        type="text"
                        value={this.props.formData.productName}
                        onChangeHandler={(e) => this.props.updateForm({
                            productName: e.target.value
                        })}
                    />

                    {/* Gender */}
                    <FormInput
                        label="Gender"
                        type="select"
                        value={this.props.formData.brandId}
                        onChangeHandler={(e) => this.props.updateForm({
                            brandId: e.target.value
                        })}
                        options={[]}
                    />

                </form>
            </div>
        );
    }
}

export default AdminAddProduct;
