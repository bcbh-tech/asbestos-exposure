import React, { Component } from 'react';
import Select from 'react-select';
import StateSelect from './select-state';
import {filteredCityData} from '../helper-functions/filter-city-data'

class FilterBar extends Component {
    filterCityData = () => {
        filteredCityData(this.props.rawAppData);
    }
    render () {
        let adjustedCityData = this.props.rawAppData.map((a) => a.city).sort();
        adjustedCityData = adjustedCityData.map((a) => ({"value": a.toLowerCase(), "label": a}));
        adjustedCityData.unshift({value: '', label: 'All'});
        let filteredArr = adjustedCityData.reduce((acc, current) => {
            let x = acc.find(item => item.value === current.value);
            if (!x) {return acc.concat([current]);} else {return acc;}
        }, []);

        ////////////////////////////
        // Conditional render for desktop/tablet
        ////////////////////////////

        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth > 640) {
            return (
                <div className="filter-bar-items">
                    <Select
                    options={this.props.stateList}
                    onChange={this.props.updateState}
                    value={this.props.selectedState}
                    isSearchable={false}
                    >
                    </Select>
                    <Select 
                    onChange={this.props.updateCity}
                    options={filteredArr} 
                    value={this.props.selectedCity}
                    >
                    </Select>
                    <input
                    placeholder="Search for..."
                    onChange={this.props.searchList} value={this.props.filter}
                    />
              </div>
            );
        } 
        
        ////////////////////////////
        // Conditional render for mobile
        ////////////////////////////

        else {
            // If Mobile Device
            return (
                <div className="filter-bar-items">
                    <StateSelect
                    updateState = {this.props.updateState} 
                    />
                    <Select 
                    onChange={this.props.updateCity}
                    options={filteredArr} 
                    value={this.props.selectedCity}
                    >
                    </Select>
                    <input
                    placeholder="Search for..."
                    onChange={this.props.searchList} value={this.props.filter}
                    />
              </div>
            );
        }
    }
}

export default FilterBar;