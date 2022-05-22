import { addCategoryBySort, addCategoryByPrice,addCategoryByDiscount, addCategoryByPopularity, sliderValue } from "./category.js";
var values;
let countCategory = 0, range1 = 0, range2 = 0, companyName, companySelected = 0;

// Ajax Call
(function ajax() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = readyServe;
    xhr.open('GET', 'https://category-db-default-rtdb.firebaseio.com/mobile.json');
    xhr.send();
    function readyServe() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                values = JSON.parse(xhr.responseText);
                console.log(values);
                findTotal();
                initialLayout();
            }
        }
    }
})();

//intially print all the values
function initialLayout() {
    sliderValue();//defined in category.js
}

//find total no of categories
function findTotal() {
    for (let company in values) {
        console.log(company);

        values[company].forEach(ele => {
            countCategory++;
            console.log(ele.color);
        });
    }
    console.log(countCategory);
}

//to filter data by brand
function filterData(company) {
    companyName = company;
    companySelected = 1;
    addCategoryByPrice(values, range1, range2);//defined in category.js
    companySelected = 0;
}

//to filter data by sort
function filterDataBySort(price) {
    addCategoryBySort(values, price);//defined in category.js
}

//to filter data by popularity
function filterDataByPopularity(raiting) {
    addCategoryByPopularity(values, raiting);//defined in category.js
}

//to filter data by price range
function filterDataByPrice(price1, price2) {
    range1 = price1; //declared above
    range2 = price2; //declared above
    addCategoryByPrice(values, price1, price2);//defined in category.js
}

//to filter data by discount
function filterDataByDiscount(discountPrice) {
    addCategoryByDiscount(values, discountPrice);//defined in category.js
}


export { filterData, filterDataBySort, filterDataByPrice, filterDataByDiscount, filterDataByPopularity, countCategory, range1, range2 , companySelected, companyName}