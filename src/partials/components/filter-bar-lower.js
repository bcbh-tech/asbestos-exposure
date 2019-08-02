import React, { Component } from 'react';

class FilterBarLower extends Component {
    render () {
        const scrollToList = () => {
            document.getElementById('item-list').scrollIntoView();
        }
        return (
            <div className="filter-bar-bottom">
                <p>Search by state, city or the search bar to better identify a location.</p>
                <div className="search-button-container">
                    <div className="search-button" onClick={scrollToList}>
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

export default FilterBarLower;