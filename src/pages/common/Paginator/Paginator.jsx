// Stylesheets
import './Paginator.scss';

// External Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Internal Dependencies
import Pagination from 'react-js-pagination';


class Paginator extends React.Component {
    static propTypes = {
        currentPage: PropTypes.number,
        pageSize: PropTypes.number,
        totalItems: PropTypes.number,
    }

    render() {
        return (
            <Pagination
                innerClass="pagination justify-content-center"
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.props.currentPage}
                itemsCountPerPage={this.props.pageSize}
                totalItemsCount={this.props.totalItems}
                pageRangeDisplayed={5}
                onChange={(newPageIndex) => {
                    this.props.handlePageChange(newPageIndex);
                }}
            />
        );
    }
}

export default Paginator;
