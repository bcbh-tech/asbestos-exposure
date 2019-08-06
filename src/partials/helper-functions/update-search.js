export function updateSearch (event, productsList, cityFilter) {
    let arrayLength = productsList.length;
    let filteredSearchList = [];
    if (event.target.value && (cityFilter === '' || cityFilter === 'All')) {
      for (let i = 0; i < arrayLength; i++) {
        if (productsList[i].company.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 || productsList[i].city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
          filteredSearchList.push(productsList[i]);
        }  
      }
    } else if (event.target.value && (cityFilter !== '' || cityFilter !== 'All')) {
      for (let n = 0; n < arrayLength; n++) {
        if (
            (productsList[n].company.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 && productsList[n].city.toLowerCase().indexOf(cityFilter.toLowerCase()) !== -1) 
            || (productsList[n].city.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 && productsList[n].city.toLowerCase().indexOf(cityFilter.toLowerCase()) !== -1)) {
          filteredSearchList.push(productsList[n]);
        }  
      }
    } else if (!event.target.value && cityFilter !== '' && cityFilter !== 'All') { 
      for (let m = 0; m < arrayLength; m++) {
        if (productsList[m].city.toLowerCase() === cityFilter.toLowerCase()) {
          filteredSearchList.push(productsList[m]);
        }
      }
    } else {   
      filteredSearchList = productsList;
    }
    let filteredArrayLength = filteredSearchList.length;
    let paginationNum = 1;
    let offsetEnd = Math.ceil(paginationNum * 15);
    let offsetStart = Math.ceil(offsetEnd - 14);
    for (let o = 0; o < filteredArrayLength; o++) {
      if (o >= offsetStart - 1 && o <= offsetEnd - 1) {
        filteredSearchList[o].visibility = "visible";
      } else {
        filteredSearchList[o].visibility = "";
      }
    }
    return filteredSearchList;
};