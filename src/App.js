import React, { Component } from 'react';
import './App.css';
import Pagination from './partials/components/pagination';
import FilterBar from './partials/components/filter-bar';
import ItemList from './partials/components/item-list';
import FilterBarLower from './partials/components/filter-bar-lower';
import {updateCity} from './partials/helper-functions/update-city';
import {updatePagination} from './partials/helper-functions/update-pagination';
import {updateSearch} from './partials/helper-functions/update-search';
import stateList from './partials/components/state-list';
import handleOutsideStateSelect from './partials/helper-functions/outside-state-select';


class App extends Component {

  ////////////////////////////
  // Define state
  ////////////////////////////

  state = {
    products: [],
    filter: '',
    filteredProducts: [],
    offset: 0,
    value: 'al',
    totalPages: 0,
    pagination: 0,
    cityFilter: '',
    loading: false,
    selectedCity: [{"value": "none", "label": "Select..."}],
    selectedState: [{"value": "al", "label": "Alabama"}]
  }

  ////////////////////////////
  // End define state
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Load data
  ////////////////////////////

  componentDidMount() {
    this.setState({loading: true});
    let outsideStateSelect = window.location.href.indexOf("state") > -1 ? window.location.href.split('state=')[1] : 'al';
    if (document.getElementById("state-select")) {document.getElementById("state-select").value = outsideStateSelect;}
    fetch(`/data/${outsideStateSelect}.json`)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        loading: false,
        products: data.results,
        filteredProducts: data.results,
        totalPages: Math.ceil(data.results.length / 15),
        value: outsideStateSelect,
        selectedState: [{"value": outsideStateSelect, "label": handleOutsideStateSelect(stateList, outsideStateSelect)}]
      });
    });
  }

  updateState = (stateSelection) => {
    let resizeStateSelection = document.getElementById("state-select") ? stateSelection.target.value : stateSelection.value;
    this.setState({
      loading: true,
      value: resizeStateSelection
    });
    let dataFetchString = `/data/${resizeStateSelection}.json`;
    fetch(dataFetchString)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        loading: false,
        products: data.results,
        filteredProducts: data.results,
        filter: '',
        cityFilter: '',
        pagination: 0,
        totalPages: Math.ceil(data.results.length / 15),
        selectedCity: [{"value": "none", "label": "Select..."}],
        selectedState: [{"value": resizeStateSelection, "label": handleOutsideStateSelect(stateList, resizeStateSelection)}]
      });
    });
  }

  ////////////////////////////
  // End load data
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Handle updates
  ////////////////////////////

  handlePaginationClick = (paginationSelection) => {
    let paginatedList = updatePagination(paginationSelection, this.state.filteredProducts);
    this.setState({
      pagination: paginationSelection.selected,
      filteredProducts: paginatedList
    });
  };

  handleCityChange = (event) => {
    let filteredList = updateCity(event, this.state.products);
    this.setState({
      filteredProducts: filteredList,
      filter: '',
      cityFilter: event.label,
      pagination: 0,
      totalPages: Math.ceil(filteredList.length / 15),
      selectedCity: [{"value": event.value, "label": event.label}]
    });
  }
  
  handleSearch = (event) => {
    this.setState({
      filter: event.target.value
    });
    let filteredSearchList = updateSearch(event, this.state.products, this.state.cityFilter);
    this.setState({
      filteredProducts: filteredSearchList,
      pagination: 0,
      totalPages: Math.ceil(filteredSearchList.length / 15)
    });
  }

  ////////////////////////////
  // End handle updates
  ////////////////////////////

  //-------------------------------//

  ////////////////////////////
  // Render app
  ////////////////////////////

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="filter-bar">
          <div className="filter-bar-boxes">
            <h2>Asbestos Exposure By Location</h2>
            <FilterBar 
              updateState={this.updateState} 
              updateCity={this.handleCityChange} 
              selectedCity={this.state.selectedCity}
              searchList={this.handleSearch}
              filter={this.state.filter} 
              rawAppData={this.state.products}
              selectedState={this.state.selectedState}
            />
          </div>
          <FilterBarLower />
        </div>
        <ItemList 
          filteredAppData={this.state.filteredProducts}
          searchQuery={this.state.filter}
          listLoading={this.state.loading} 
        />
        <Pagination 
          updateFullList={this.handlePaginationClick} 
          totalPageCount={this.state.totalPages}
          paginationSelection={this.state.pagination} 
        />
      </div>
    );
  }
}

////////////////////////////
  // End render app
  ////////////////////////////

export default App;
