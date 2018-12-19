// StyleSheets
import './SearchPanel.scss';

// External Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Intenral Dependencies
import { ROUTE_NAME } from '../../../routes/main.routing';
import LIB from '../../../helpers/lib';
import WebService from '../../../services/WebService';
import { QUERY_PARAMS } from '../../../config/constants';


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

class SearchPanel extends React.Component {
    static propTypes = {
        updateBranches: PropTypes.func,
        currentIndustryId: PropTypes.number,
        industries: PropTypes.array
    }

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
        let queryString = '?';

        if (this.state.filter.brand.id) {
            queryString += `${QUERY_PARAMS.brandId}=${this.state.filter.brand.id}`;
        }

        if (this.state.filter.priceFrom && this.state.filter.priceTo) {
            queryString += `&${QUERY_PARAMS.minPrice}=${this.state.filter.priceFrom}`;
            queryString += `&${QUERY_PARAMS.maxPrice}=${this.state.filter.priceTo}`;
        }

        this.props.history.push(queryString);
    }


    generateBrands() {
        let visibleElements = [];
        let collapsedElements = [];

        const L = this.state.brands.length;
        for (let i = 0; i < L; i++) {
            let elementContainer = visibleElements;

            if (i > 5) {
                elementContainer = collapsedElements;
            }

            const brand = this.state.brands[i];
            elementContainer.push(
                <li key={i}
                ><a href="#/"
                    onClick={() => this.handleFilterItemSelected({ brand })}
                    className={(brand.brandName === this.state.filter.brand.brandName ? "filter-item-selected" : undefined)}
                >{brand.brandName}</a></li>
            );
        }


        return (
            <>
                {visibleElements}
                <div id="collapseBrands" className="collapse">
                    {collapsedElements}
                </div>
                <span className="btn-link" data-toggle="collapse" data-target="#collapseBrands" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Toggle
                </span>
            </>
        );
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

export default SearchPanel;
