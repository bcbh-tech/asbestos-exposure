export function updateCity (event, productsList) {
    let filteredSearchList = [];
    if (event.value !== '') {
    let arrayLength = productsList.length;
    for (var i = 0; i < arrayLength; i++) {
        if (productsList[i].city.toLowerCase() === event.label.toLowerCase()) {
        filteredSearchList.push(productsList[i]);
        }
    }
    } else {
    filteredSearchList = productsList;
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
    return filteredSearchList;
};