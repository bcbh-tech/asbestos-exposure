import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

class Pagination extends Component {
    render () {
        return (
            <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.props.totalPageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={6}
                onPageChange={this.props.updateFullList}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        );
    }
}

export default Pagination;