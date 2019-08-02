import React, { Component } from 'react';

class StateSelect extends Component {
    render () {
        return (
            <select id="state-select" onChange={this.props.updateState}>
                <option value="al">Alabama</option>
                <option value="ak">Alaska</option>
                <option value="az">Arizona</option>
                <option value="ar">Arkansas</option>
                <option value="ca">California</option>
            </select>
        );
    }
}

export default StateSelect;