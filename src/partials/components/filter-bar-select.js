import React, { Component } from 'react';

class FilterBarSelect extends Component {
    render () {
        return (
            <div>
                <p id="shipSelect" onClick={this.props.updateShips}>Select to search for ships</p>
            </div>
        );
    }
}

export default FilterBarSelect;