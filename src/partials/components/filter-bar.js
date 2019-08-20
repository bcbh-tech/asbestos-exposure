import React, { Component } from 'react';
import Select from 'react-select';
import StateSelect from './select-state';

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
        window.addEventListener("resize", function() {
            if (window.matchMedia("(min-width: 600px)").matches) {
                console.log("Screen width is at least 500px");
            } else {
                console.log("Screen less than 500px");
            }
        });
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

export default FilterBar;