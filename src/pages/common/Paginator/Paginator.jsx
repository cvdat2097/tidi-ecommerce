import React from 'react';
import './Paginator.scss';

import Pagination from 'react-js-pagination';

export default class Paginator extends React.Component {

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
                    this.props.updatePaginatorInfo({
                        currentPage: newPageIndex
                    });
                    this.props.handlePageChange();
                }}
            />
        );
    }
}
