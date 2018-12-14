// Stylesheet
import './AdminAddProduct.scss';

// External dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal dependencies
import FormInput from '../../../common/FormInput';


class AdminAddProduct extends React.Component {
    static propTypes = {
        updateForm: PropTypes.func,
        editMode: PropTypes.bool,
        formData: PropTypes.object,
        brands: PropTypes.array,
        industries: PropTypes.array,
        branches: PropTypes.array,
        categories: PropTypes.array
    }

    render() {
        return (
            <div>
                <form >
                    {/* PRODUCTNAME */}
                    <div className="row">
                        <FormInput
                            label="Product Name"
                            type="text"
                            value={this.props.formData.productName}
                            onChangeHandler={(e) => this.props.updateForm({
                                productName: e.target.value
                            })}
                            additionalClass="col-md-6 col-sm-6"
                        />

                        {/* PRICE */}
                        <FormInput
                            label="Price"
                            type="text"
                            value={this.props.formData.price}
                            onChangeHandler={(e) => this.props.updateForm({
                                price: e.target.value
                            })}
                            additionalClass="col-md-3 col-sm-6"
                        />

                        {/* AMOUNT */}
                        <FormInput
                            label="Amount"
                            type="text"
                            value={this.props.formData.amount}
                            onChangeHandler={(e) => this.props.updateForm({
                                amount: e.target.value
                            })}
                            additionalClass="col-md-3 col-sm-6"
                        />
                    </div>

                    <div className="row">
                        {/* BRAND */}
                        <FormInput
                            label="Brand"
                            type="select"
                            value={this.props.formData.brandId}
                            onChangeHandler={(e) => this.props.updateForm({
                                brandId: e.target.value,
                            })}
                            options={this.props.brands.map(brand => ({ value: brand.id, name: brand.brandName }))}
                            additionalClass="col-md-3 col-sm-6"
                        />

                        {/* INDUSTRY */}
                        <FormInput
                            label="Industry"
                            type="select"
                            value={this.props.formData.industryId}
                            onChangeHandler={(e) => {
                                this.props.updateForm({
                                    industryId: e.target.value
                                });
                                this.props.changeIndustryHandler(e.target.value);
                            }}
                            options={this.props.industries.map(industry => ({ value: industry.id, name: industry.industryName }))}
                            additionalClass="col-md-3 col-sm-6"
                        />

                        {/* BRANCH */}
                        <FormInput
                            label="Branch"
                            type="select"
                            value={this.props.formData.branchId}
                            onChangeHandler={(e) => {
                                this.props.updateForm({
                                    branchId: e.target.value
                                });
                                this.props.changeBranchHandler(e.target.value);
                            }}
                            options={this.props.branches.map(branch => ({ value: branch.id, name: branch.branchName }))}
                            additionalClass="col-md-3 col-sm-6"
                        />

                        {/* CATEGORY */}
                        <FormInput
                            label="Category"
                            type="select"
                            value={this.props.formData.categoryId}
                            innerHTML={this.props.formData.categoryName}
                            onChangeHandler={(e) => this.props.updateForm({
                                categoryId: e.target.value
                            })}
                            options={this.props.categories.map(category => ({ value: category.id, name: category.categoryName }))}
                            additionalClass="col-md-3 col-sm-6"
                        />
                    </div>

                    {/* Images */}
                    <FormInput
                        label="Images"
                        type="textarea"
                        value={this.props.formData.images}
                        onChangeHandler={(e) => this.props.updateForm({
                            images: e.target.value
                        })}
                        rows="7"
                    />

                    {/* DESCRIPTION */}
                    <FormInput
                        label="Description"
                        type="textarea"
                        value={this.props.formData.description}
                        onChangeHandler={(e) => this.props.updateForm({
                            description: e.target.value
                        })}
                        rows="5"
                    />
                </form>
            </div>
        );
    }
}

export default AdminAddProduct;
