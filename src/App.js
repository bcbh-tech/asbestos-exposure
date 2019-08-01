import React, { Component } from 'react';
import './App.css';
import Pagination from './partials/components/pagination';
import FilterBar from './partials/components/filterbar';
import {updateTheCity} from './partials/helper-functions/update-city';


class App extends Component {
  state = {
    products: [],
    filter: '',
    filteredProducts: [],
    offset: 0,
    value: 'al',
    totalPages: 0,
    cityFilter: '',
    selectedCity: [{"value": "none", "label": "Select..."}]
  }

  componentDidMount() {
    fetch('data/al.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        products: data.results,
        filteredProducts: data.results,
        totalPages: Math.ceil(data.results.length / 15)
      });
    });
  }

  handlePageClick = (paginationSelection) => {
    let arrayLength = this.state.filteredProducts.length;
    let paginationNum = paginationSelection.selected + 1;
    let offsetEnd = Math.ceil(paginationNum * 15);
    let offsetStart = Math.ceil(offsetEnd - 14);
    let paginatedList = this.state.filteredProducts;
    for (var i = 0; i < arrayLength; i++) {
      if (i >= offsetStart - 1 && i <= offsetEnd - 1) {
        console.log(this.state.filteredProducts[i]);
        paginatedList[i].visibility = "visible";
      } else {
        paginatedList[i].visibility = "";
      }
    }
    this.setState({
      filteredProducts: paginatedList
    });
  };

  updateState = (stateSelection) => {
    this.setState({
      value: stateSelection.target.value
    });
    let dataFetchString = "data/" + stateSelection.target.value + ".json";
    fetch(dataFetchString)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        products: data.results,
        filteredProducts: data.results,
        filter: '',
        cityFilter: '',
        totalPages: Math.ceil(data.results.length / 15),
        selectedCity: [{"value": "none", "label": "Select..."}]
      });
    });
  }

  updateCity = (event) => {
      let filteredList = updateTheCity(event, this.state.products);
      this.setState({
        filteredProducts: filteredList,
        filter: '',
        cityFilter: event.label,
        totalPages: Math.ceil(filteredList.length / 15),
        selectedCity: [{"value": event.value, "label": event.label}]
      });
  }
  

  searchList = (event) => {
    this.setState({
      filter: event.target.value
    });
      let arrayLength = this.state.products.length;
      let filteredSearchList = [];
      if (event.target.value && this.state.cityFilter === '') {
        for (var i = 0; i < arrayLength; i++) {
          if (this.state.products[i].company.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 || this.state.products[i].city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
            filteredSearchList.push(this.state.products[i]);
          }  
        }
      } else if (event.target.value && this.state.cityFilter !== '') {
        for (var n = 0; n < arrayLength; n++) {
          if (
              (this.state.products[n].company.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 && this.state.products[n].city.toLowerCase().indexOf(this.state.cityFilter.toLowerCase()) !== -1) 
              || (this.state.products[n].city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 && this.state.products[n].city.toLowerCase().indexOf(this.state.cityFilter.toLowerCase()) !== -1)) {
            filteredSearchList.push(this.state.products[n]);
          }  
        }
      } else if (!event.target.value && this.state.cityFilter !== '') { 
        for (var m = 0; m < arrayLength; m++) {
          if (this.state.products[m].city.toLowerCase().indexOf(this.state.cityFilter.toLowerCase()) !== -1) {
            filteredSearchList.push(this.state.products[m]);
          }
        }
      } else {   
        filteredSearchList = this.state.products;
      }
      let filteredArrayLength = filteredSearchList.length;
      let paginationNum = 1;
      let offsetEnd = Math.ceil(paginationNum * 15);
      let offsetStart = Math.ceil(offsetEnd - 14);
      for (var o = 0; o < filteredArrayLength; o++) {
        if (o >= offsetStart - 1 && o <= offsetEnd - 1) {
          filteredSearchList[o].visibility = "visible";
        } else {
          filteredSearchList[o].visibility = "";
        }
      }
      this.setState({
        filteredProducts: filteredSearchList,
        totalPages: Math.ceil(filteredSearchList.length / 15)
      });
  }

  render() {
    let filteredAppData = this.state.filteredProducts;
    let fullList = filteredAppData.map((d) => <li className={d.visibility + " list-item"} key={d.id}>{d.company} - {d.city}, {d.state}</li>);
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="filter-bar">
          <h2>Asbestos Exposure By Location</h2>
          <FilterBar 
            updateState={this.updateState} 
            updateCity={this.updateCity} 
            selectedCity={this.state.selectedCity}
            searchList={this.searchList}
            filter={this.state.filter} 
            rawAppData={this.state.products}
          />
        </div>
        <ul className="item-list">
              {fullList}
        </ul>
        <Pagination updateFullList={this.handlePageClick} totalPageCount={this.state.totalPages} />
      </div>
    );
  }
}

export default App;
