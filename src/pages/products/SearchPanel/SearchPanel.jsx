import React from 'react';
import { Link } from 'react-router-dom';
import './SearchPanel.scss';

import { ROUTE_NAME } from '../../../routes/main.routing';

import LIB from '../../../helpers/lib';
import WebService from '../../../services/WebService';

// INPUT: branchId

const INITIAL_STATE = {
    brands: [],
    filter: {
        brand: {},
        priceFrom: '',
        priceTo: '',
        priceIsInvalid: false
    }
}

export default class SearchPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.generateBrands = this.generateBrands.bind(this);
        this.generateBranches = this.generateBranches.bind(this);
        this.handleFilterItemSelected = this.handleFilterItemSelected.bind(this);
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
        this.fetchAllBrands = this.fetchAllBrands.bind(this);
    }

    componentDidMount() {
        this.fetchAllBrands();

        this.props.updateBranches(0);
    }

    fetchAllBrands() {

        WebService.getAllBrands().then(brds => {
            const brands = JSON.parse(brds);
            this.setState({
                brands
            });
        });
    }


    generateBrands() {
        return this.state.brands.map((brand, index) => {
            return <li key={index}
            ><a href="#/"
                onClick={() => this.handleFilterItemSelected({ brand })}
                className={(brand.brandName === this.state.filter.brand.brandName ? "filter-item-selected" : undefined)}
            >{brand.brandName}</a></li>
        });
    }

    generateBranches() {
        if (this.props.currentIndustryId !== undefined && this.props.industries[this.props.currentIndustryId]) {
            return this.props.industries[this.props.currentIndustryId].branches.map((branch, index) => {
                let idName = LIB.generateRandomString();
                return (
                    <li key={index} data-toggle="collapse" data-target={"#" + idName}>
                        <a href="#/">{branch.branchName}</a>
                        <ul className={"sub-menu collapse" + (index === 0 ? " show" : "")}
                            id={idName}>
                            {branch.categories.map((category, index) => <li key={index}><Link to={{
                                pathname: ROUTE_NAME.PRODUCTS,
                                search: `?cat=${category.id}`
                            }} >{category.categoryName}</Link></li>)}
                        </ul>
                    </li>
                );
            });
        }

        return '';
    }

    handleFilterItemSelected(filter) {
        this.setState({
            filter: {
                ...this.state.filter,
                ...filter
            }
        });
    }

    handleChangePrice(propName, value) {
        const newState = {};

        let x = Number(value);
        if (value === '' || x) {
            newState[propName] = value;
            newState['priceIsInvalid'] = false;
        } else {
            newState['priceIsInvalid'] = true;

        }

        this.setState({
            filter: {
                ...this.state.filter,
                ...newState
            }
        });

    }


    handleApplyFilter() {
        console.log(this.state.filter);
    }

    render() {
        return (
            <div className="shop_sidebar_area">
                {/* <!-- ##### Single Widget ##### --> */}
                <div className="widget catagory mb-50">
                    {/* <!-- Widget Title --> */}
                    <h6 className="widget-title mb-30">Catagories</h6>

                    {/* <!--  Catagories  --> */}
                    <div className="catagories-menu">
                        <ul id="menu-content2" className="menu-content collapse show">
                            {/* <!-- Single Item --> */}
                            {this.generateBranches()}
                        </ul>
                    </div>
                </div>

                {/* <!-- ##### Single Widget ##### --> */}
                <div className="widget price mb-50">
                    {/* <!-- Widget Title --> */}
                    <h6 className="widget-title mb-30">Filter by</h6>
                    {/* <!-- Widget Title 2 --> */}
                    <p className="widget-title2 mb-30">Price</p>

                    <div className="widget-desc">
                        <div className="d-flex">
                            <input className={"form-control mr-2" + (this.state.filter.priceIsInvalid ? " is-invalid" : "")} placeholder="From"
                                value={this.state.filter.priceFrom}
                                onChange={(e) => this.handleChangePrice('priceFrom', e.target.value)}
                            />
                            <input className={"form-control" + (this.state.filter.priceIsInvalid ? " is-invalid" : "")} placeholder="To"
                                value={this.state.filter.priceTo}
                                onChange={(e) => this.handleChangePrice('priceTo', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* <!-- ##### Single Widget ##### --> */}
                <div className="widget brands mb-50">
                    {/* <!-- Widget Title 2 --> */}
                    <p className="widget-title2 mb-30">Brands</p>
                    <div className="widget-desc">
                        <ul>
                            {this.generateBrands()}
                        </ul>
                    </div>
                </div>

                <div className="widget mb-50 d-flex justify-content-center">
                    <button className="btn essence-btn btn-sm"
                        onClick={this.handleApplyFilter}
                    >Apply Filter</button>
                </div>
            </div>
        );
    }
}
