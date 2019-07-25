import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select'
import './App.css';


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
      let filteredSearchList = [];
      if (event.value !== '') {
        let arrayLength = this.state.products.length;
        for (var i = 0; i < arrayLength; i++) {
          if (this.state.products[i].city.toLowerCase().indexOf(event.label.toLowerCase()) !== -1) {
            filteredSearchList.push(this.state.products[i]);
          }
        }
      } else {
        filteredSearchList = this.state.products;
      }
      let arrayLength = filteredSearchList.length;
      let paginationNum = 1;
      let offsetEnd = Math.ceil(paginationNum * 15);
      let offsetStart = Math.ceil(offsetEnd - 14);
      for (var m = 0; m < arrayLength; m++) {
        if (m >= offsetStart - 1 && m <= offsetEnd - 1) {
          filteredSearchList[m].visibility = "visible";
        } else {
          filteredSearchList[m].visibility = "";
        }
      }
      this.setState({
        filteredProducts: filteredSearchList,
        filter: '',
        cityFilter: event.label,
        totalPages: Math.ceil(filteredSearchList.length / 15),
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

  filteredCityData = () => {
    let arrayLength = this.state.products.length;
    let cityData = [];
    cityData.push("");
    for (var i = 0; i < arrayLength; i++) {
      cityData.push(this.state.products[i].city);
    }
    let x = (cityData) => cityData.filter((v,i) => cityData.indexOf(v) === i)
    cityData = x(cityData);
    return cityData;
  }

  render() {
    let rawAppData = this.state.products;
    let filteredAppData = this.state.filteredProducts;
    let fullList = filteredAppData.map((d) => <li className={d.visibility + " list-item"} key={d.id}>{d.company} - {d.city}, {d.state}</li>);
    let cityData = this.filteredCityData();
    let adjustedCityData = rawAppData.map((a) => ({"value": a.city.toLowerCase(), "label": a.city}));
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
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="filter-bar">
          <h2>Asbestos Exposure By Location</h2>
          <div className="filter-bar-items">
            <select onChange={this.updateState}>
              <option value="al">Alabama</option>
              <option value="ak">Alaska</option>
              <option value="az">Arizona</option>
              <option value="ar">Arkansas</option>
              <option value="ca">California</option>
            </select>
            <Select 
              onChange={this.updateCity}
              options={filteredArr} 
              value={this.state.selectedCity}
            >
              {cityList}
            </Select>
            <input
              placeholder="Search for..."
              onChange={this.searchList} value={this.state.filter}
            />
          </div>
        </div>
        <ul className="item-list">
              {fullList}
        </ul>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={6}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;
