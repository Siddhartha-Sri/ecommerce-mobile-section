import { filterDataBySort, filterDataByPopularity, filterDataByPrice, filterDataByDiscount, countCategory, range1, range2, companyName, companySelected } from "./setup.js";
let categoryList = [];// to save elements that are pushed to be printed in categories
let categoryPrice = [];// to save price of present printed categories
let categoryRaiting = [];// to save raitings of present printed categories
let count = 0; //to check the printed no. of categories
let filterBrandCheck = 0; //to check if brand is selected
let span;

//function to print by price sorting
function addCategoryBySort(values, price) {
    for (let company in values) {
        values[company].forEach(ele => {
            if (ele.sellingPrice === price) {
                count++;
                printCategory(ele);//function call to add anchor tags in category-div section in main
            }
        });
    }
    printResultStat(count);
}

//function to print by popularity sorting
function addCategoryByPopularity(values, raiting) {
    for (let company in values) {
        values[company].forEach(ele => {
            if (ele.raiting === raiting) {
                count++;
                printCategory(ele);//function call to add anchor tags in category-div section in main
            }
        });
    }
    printResultStat(count);
}

//function to filter with price range
function addCategoryByPrice(values, price1, price2) {
    categoryRaiting.splice(0, categoryRaiting.length);
    //if company is selected in filters
    if (companySelected === 1) {
        values[companyName].forEach(ele => {
            if ((ele.sellingPrice <= price2) && (ele.sellingPrice > price1)) {
                categoryPrice.push(ele.sellingPrice);//push sellingPrices in range in categoryPrice array
                categoryRaiting.push(ele.raiting);//push raitings in range in categoryRating array
                printCategory(ele);//function call to add anchor tags in category-div section in main
                count++;
            }
        });
        printResultStat(count);
        count = 0;
    } else { //if company is not selected in filters
        for (let company in values) {
            if (filterBrandCheck === 0) {
                addBrandFilter(company);
            }
            values[company].forEach(ele => {
                if ((ele.sellingPrice <= price2) && (ele.sellingPrice > price1)) {
                    categoryPrice.push(ele.sellingPrice);//push sellingPrices in range in categoryPrice array
                    categoryRaiting.push(ele.raiting);//push raitings in range in categoryRating array
                    printCategory(ele);//function call to add anchor tags in category-div section in main
                    count++;
                }
            });
        }
        filterBrandCheck++;
        printResultStat(count);
        count = 0;
    }

}

//function to filter with discount
function addCategoryByDiscount(values, discountPrice) {
    for (let company in values) {
        values[company].forEach(ele => {
            let currentDiscount = findDiscount(ele.listPrice, ele.sellingPrice);
            if (discountPrice <= currentDiscount) {
                printCategory(ele);//function call to add anchor tags in category-div section in main
                count++;
            }
        });
    }
    printResultStat(count);
    count = 0;
}

//function to add anchor tags in category-div section in main
function printCategory(ele) {
    // create anchor tag in categorylist
    let anchor = document.createElement("a");
    anchor.href = "#";
    anchor.setAttribute('id', `anchor${ele.name}`);
    document.getElementById("categorylist").appendChild(anchor);

    // create category-child in above created anchor tag in categorylist
    let categoryChild = document.createElement("div");
    categoryChild.classList.add('category-child');
    document.getElementById(`anchor${ele.name}`).appendChild(categoryChild);
    categoryList.push(anchor);

    // create category-image in above created category-child tag in categorylist
    let newElement= document.createElement("div");
    newElement.classList.add('category-image');
    newElement.setAttribute('id', `image${ele.name}`);
    anchor.querySelector('div').appendChild(newElement);

    // create category-child-specs in above created category-child tag in categorylist
    newElement = document.createElement("div");
    newElement.classList.add('category-child-specs');
    newElement.setAttribute('id', `specs${ele.name}`);
    anchor.querySelector('div').appendChild(newElement);

    // create category-child-price in above created category-child tag in categorylist
    newElement = document.createElement("div");
    newElement.classList.add('category-child-price');
    newElement.setAttribute('id', `price${ele.name}`);
    anchor.querySelector('div').appendChild(newElement);

    //add anchor tag finally to categorylist section
    document.getElementById("categorylist").appendChild(anchor);

    let elements = document.getElementById(`image${ele.name}`);
    newElement = document.createElement("img");
    newElement.src = `${ele.image}`;
    elements.appendChild(newElement);

    newElement = document.createElement("button");
    newElement.setAttribute('id', 'addtocart');
    newElement.appendChild(document.createTextNode('Add to Cart'));
    elements.appendChild(newElement);

    elements = document.getElementById(`specs${ele.name}`);
    newElement = document.createElement("h3");
    newElement.appendChild(document.createTextNode(`${ele.name}`));
    elements.appendChild(newElement);

    let ul = document.createElement("ul");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${ele.color}`));
    ul.appendChild(li);
    li = document.createElement("li");
    li.appendChild(document.createTextNode(`Ram - ${ele.ram}`));
    ul.appendChild(li);
    li = document.createElement("li");
    li.appendChild(document.createTextNode(`Display - ${ele.display} inches`));
    ul.appendChild(li);
    li = document.createElement("li");
    li.appendChild(document.createTextNode(` ${ele.raiting} ⭐ `));
    ul.appendChild(li);
    elements.appendChild(ul);

    elements = document.getElementById(`price${ele.name}`);
    newElement = document.createElement("div");
    newElement.classList.add('selling-price');
    newElement.innerHTML += `&#8377; ${ele.sellingPrice}`;
    elements.appendChild(newElement);

    newElement = document.createElement("div");
    let del = document.createElement("del");
    del.innerHTML += `&#8377; ${ele.listPrice}`;
    newElement.appendChild(del);
    let span = document.createElement("span");
    span.classList.add('price-off');

    let discount = findDiscount(ele.listPrice, ele.sellingPrice).toFixed();
    span.innerHTML += `${discount}&#37; off`;
    newElement.appendChild(span);
    elements.appendChild(newElement);
}

//function to find discount
function findDiscount(listPrice, sellingPrice) {
    let discount = (listPrice - sellingPrice);
    discount = discount / listPrice;
    discount = discount * 100;
    return discount;

}

//function to print found no.of products
function printResultStat(count) {
    if (span) {
        span.remove();
    }
    span = document.createElement("span");
    span.appendChild(document.createTextNode(`Showing - ${count} of ${countCategory} Products`));
    document.getElementById("result-stat").appendChild(span);
    if (count === 0) {
        document.querySelector('.novalues').style.display = 'block';
        emptyCategoryList();
    } else {
        document.querySelector('.novalues').style.display = 'none';
    }
}

//empty categoryList i.e all the andcor tags dynamically displayed on screen
function emptyCategoryList() {
    for (let i = 0; i < categoryList.length; i++) {
        categoryList[i].remove();
    }
    categoryList.splice(0, categoryList.length);
    console.log(categoryList);
}

//Add Brands in brand filter pannel 
//function call from addCategoryByPrice function 
function addBrandFilter(company) {
    let button = document.createElement("button");
    button.classList.add('brand-filter-button');
    let newElement = document.createElement("h4");
    newElement.appendChild(document.createTextNode(`${company}`));
    button.appendChild(newElement);
    document.getElementById("filterbrand").appendChild(button);
}

//function call from event.js 
//function call from setup.js 
function sliderValue() {
    let slider1 = document.getElementById("slider1");
    let price1 = slider1.value;
    document.getElementById("slider1value").innerHTML = price1;
    let slider2 = document.getElementById("slider2");
    let price2 = slider2.value;
    document.getElementById("slider2value").innerHTML = `- ${price2}`;

    slider1.setAttribute("max", `${price2}`);
    slider2.setAttribute("min", `${price1}`);
    filterDataByPrice(price1, price2);//defined in setup.js
}

//function call from event.js 
function discountValue() {
    let discount = document.getElementById("discount");
    let discountPrice = discount.value;
    document.getElementById("discountvalue").innerHTML = ` ${discountPrice} &#37;`;
    filterDataByDiscount(discountPrice);//defined in setup.js 
}

//function call from event.js 
function ascendSort() {
    categoryPrice.sort(function (a, b) { return a - b });
    emptyCategoryList();
    for (let i = 0; i < categoryPrice.length; i++) {
        filterDataBySort(categoryPrice[i]);//defined in setup.js 
    }
    count = 0;
}

//function call from event.js 
function descendSort() {
    categoryPrice.sort(function (a, b) { return b - a });
    emptyCategoryList();
    for (let i = 0; i < categoryPrice.length; i++) {
        filterDataBySort(categoryPrice[i]);//defined in setup.js 
    }
    count = 0;
}

//function call from event.js 
//to sort with respect to rating
function popularSort() {
    categoryRaiting.sort(function (a, b) { return b - a });
    for (let i = 0; i < categoryRaiting.length; i++) {
        filterDataByPopularity(categoryRaiting[i]);//defined in setup.js 
    }
    count = 0;
}


export {  popularSort, addCategoryByPopularity, addBrandFilter, discountValue, emptyCategoryList, addCategoryByDiscount, ascendSort, descendSort, addCategoryBySort, addCategoryByPrice, sliderValue, categoryPrice };