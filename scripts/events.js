import { filterData } from "./setup.js";
import { emptyCategoryList, ascendSort, descendSort,sliderValue ,categoryPrice, discountValue,popularSort } from "./category.js";
let inspect = 0, smallInspect = 0;

//event for brand filter
document.getElementById("filterbrand").addEventListener("click", function (ele) {
    if (ele.target.matches("h4") ) {
        let company = ele.target.innerHTML;
        categoryPrice.splice(0, categoryPrice.length);//to empty categoryPrice array
        emptyCategoryList();
        filterData(company);//defined in setup.js
    }
});

//event for reset filter
document.getElementById('resetfilter').addEventListener("click",function(){
    let slider1 = document.getElementById("slider1");
    let slider2 = document.getElementById("slider2");
    let discount = document.getElementById("discount");
    slider1.value = 0;
    slider2.value = 70000;
    discount.value = 0;
    discount.click();
    slider1.click();
    slider2.click();
    document.querySelector('.novalues').style.display='none';
});

//event for hidden menu in medium to small screens
document.querySelector('.open-menu').addEventListener("click", function () {
    document.querySelector('.main-menu').style.display='block';
    document.querySelector('.open-menu').style.display='none';
});

//event for hidden filter close menu in medium to small screens
document.querySelector('.close-menu').addEventListener("click", function () {
    document.querySelector('.main-menu').style.display='none';
    document.querySelector('.open-menu').style.display='block';
});

//event for hidden filter menu in medium screens
document.getElementById('filter-dropdown').addEventListener("click", function () {
    if(inspect === 0){
        document.querySelector('.filter-price').style.display='block';
        document.querySelector('.filter-brand').style.display='block';
        document.getElementById('resetfilter').style.display='block';
        document.querySelector('.filter-discount').style.display='block';
        inspect++ ;
    }else{
        document.querySelector('.filter-price').style.display='none';
        document.querySelector('.filter-brand').style.display='none';
        document.getElementById('resetfilter').style.display='none';
        document.querySelector('.filter-discount').style.display='none';
        inspect = 0;
    }
});

//event for hidden filter menu in small screens
document.getElementById('filter-show').addEventListener("click", function () {
    if(smallInspect === 0){
        document.querySelector('.filter-price').style.display='block';
        document.querySelector('.filter-brand').style.display='block';
        document.getElementById('resetfilter').style.display='block';
        document.querySelector('.filter-discount').style.display='block';
        document.querySelector('.filter-button-div').style.display='block';
        smallInspect++ ;//to establish that menu is open
    }else{
        document.querySelector('.filter-price').style.display='none';
        document.querySelector('.filter-brand').style.display='none';
        document.getElementById('resetfilter').style.display='none';
        document.querySelector('.filter-discount').style.display='none';
        document.querySelector('.filter-button-div').style.display='none';
        smallInspect = 0;//to establish menu is closed
    }
});

//event for starting price filter menu 
document.getElementById("slider1").addEventListener("click", function () {
    categoryPrice.splice(0, categoryPrice.length);//to empty categoryPrice array
    emptyCategoryList();//defined in category.js
    sliderValue();//defined in category.js
});

//event for ending price filter menu
document.getElementById("slider2").addEventListener("click", function () {
    categoryPrice.splice(0, categoryPrice.length);////to empty categoryPrice array
    emptyCategoryList();//defined in category.js
    sliderValue();//defined in category.js
});

//event for discount filter menu
document.getElementById("discount").addEventListener("click", function () {
    emptyCategoryList();//defined in category.js
    discountValue();//defined in category.js
});

//event for ascend sort in large screens
document.getElementById("low-to-high").addEventListener("click", function (){
    ascendSort();//defined in category.js
}); 
//event for ascend sort in small and medium screen
document.getElementById("sm-low-to-high").addEventListener("click", function (){
    ascendSort();//defined in category.js
}); 

//event for descend sort in large screens
document.getElementById("high-to-low").addEventListener("click", function (){
    descendSort();//defined in category.js
}); 
//event for descend sort in small and medium screen
document.getElementById("sm-high-to-low").addEventListener("click", function (){
    descendSort();//defined in category.js
}); 

//event for popularity sort in large screen
document.getElementById("popular").addEventListener("click", function(){
    emptyCategoryList();//defined in category.js
    popularSort();//defined in category.js
}); 
//event for popularity sort in small and medium screen
document.getElementById("sm-popular").addEventListener("click", function(){
    emptyCategoryList();//defined in category.js
    popularSort();//defined in category.js
}); 
