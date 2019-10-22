import React, { Component } from 'react';

class FilterBarSelect extends Component {
    render () {
        return (
            <div className="ships-checkbox-container">
                <input type="checkbox" id="shipSelect" onClick={this.props.updateShips} /><p>Select to search for ships</p>
            </div>
        );
    }
}

export default FilterBarSelect;