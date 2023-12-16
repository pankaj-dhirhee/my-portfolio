//it is container of all image boxes
let sliderCon = document.querySelector('.slider-container');

//geting an array which contains images path
let spSliderArr = localStorage.getItem('spSliderArr');

//parsing an array which contains images path
let parsed = JSON.parse(spSliderArr);



//=======================================
//appending boxes and images to slider container
//=======================================
parsed.forEach((ele)=>{
 //I amge box
 let box = document.createElement('div');
 //adding classlist to image box
 box.classList.add('image-box');
 //image tag
 let img = document.createElement('img');
 //setting src = array given images path
 img.src = ele.img;
 //sppending image tag to image box
 box.append(img);
 //appending i.age box to slider container
 sliderCon.append(box);
 
});//for each on sp slider array