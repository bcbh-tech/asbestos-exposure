import React, { Component } from 'react';
import Select from 'react-select';
import StateSelect from './select-state';
import stateList from './state-list';

class FilterBar extends Component {

    filteredCityData = () => {
        let arrayLength = this.props.rawAppData.length;
        let cityData = [];
        cityData.push("");
        for (var i = 0; i < arrayLength; i++) {
          cityData.push(this.props.rawAppData[i].city);
        }
        let x = (cityData) => cityData.filter((v,i) => cityData.indexOf(v) === i)
        cityData = x(cityData);
        return cityData;
      }
    
    render () {
        let cityData = this.filteredCityData();
        let adjustedCityData = this.props.rawAppData.map((a) => a.city).sort();
        adjustedCityData = adjustedCityData.map((a) => ({"value": a.toLowerCase(), "label": a}));
        adjustedCityData.unshift({value: '', label: 'All'});
        let cityList = cityData.map((item, index) => <option key={index}>{item}</option>);
        let filteredArr = adjustedCityData.reduce((acc, current) => {
        let x = acc.find(item => item.value === current.value);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
        }, []);
        var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
        if (viewportWidth > 640) {
            return (
                <div className="filter-bar-items">
                    <Select
                    options={stateList}
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
                    {cityList}
                    </Select>
                    <input
                    placeholder="Search for..."
                    onChange={this.props.searchList} value={this.props.filter}
                    />
              </div>
            );
        } else {
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
                    {cityList}
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