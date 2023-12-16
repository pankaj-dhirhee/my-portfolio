//variables
//getting and parsing a product array it contains all product array
let productsArr = JSON.parse(localStorage.getItem('pArr'));




//if array is not setted then set it 
let saved = localStorage.getItem('save');

//if product array is not setted then set it 
if(saved != 'yes'){
 let empty = [];
 let strme = JSON.stringify(empty);
 localStorage.setItem('parr', strme);
 //value yes because now array is setted
 localStorage.setItem('save', 'yes')
}
let arr = localStorage.getItem('parr');
let parsedArr = JSON.parse(arr);
let reversed = parsedArr.reverse();


//variables
//this is source of delete btn image
let deleteCartImgSource = '../assets-folder/delete-cart.png';

//this is items container
//here all the product boxes will be append
let itemCon = document.getElementById('items-container');




//========================================
//generating html for each array obj
//========================================
function append(){

reversed.forEach((obj, index)=>{
//this is main outer parent for product box
let mainB = document.createElement('div'); 
//adding classlist to main outer parent           
mainB.classList.add('box-main-container');
//this is box sub container
let bCon = document.createElement('div');
//adding classlist to box sub container
bCon.classList.add('box-container');
//this is anchor tag
//anchor for going to sp product page
//span for going to sp product page
let aBox = document.createElement('span');
//giving classList to aBox
aBox.classList.add('a-box');
let imgCon = document.createElement('div');
//adding classlist to product image container
imgCon.classList.add('image-container');
//this is product image tag
let pImage = document.createElement('img');
//setting src of product image tag
pImage.src = obj.pImg;
//appending product inage to its product image container
imgCon.append(pImage);
//this is main para container
let mPCon = document.createElement('div');
//adding classlist ti main para container
mPCon.classList.add('main-para-container');
//this is sub para container
let pCon = document.createElement('div');
//adding classList to sub para container
pCon.classList.add('para-container');
//this is users choice para tag
let userChoP = document.createElement('p');
//setting inner text of users choice para
userChoP.innerText = "users choice";
//adding classlist to users choice para
userChoP.classList.add('users-choice');
//this is product para tag
let proPara = document.createElement('p');
//setting inner text of product para
proPara.innerText = obj.name;
//adding classlist to product para
proPara.classList.add('product-para');
//appending 'users-choice-para' and 'product para' to sub product para container
pCon.append(userChoP, proPara);
//appending sub product para container to main product container
mPCon.append(pCon);
//appending 'image-container' and  'main-para-container' unside anchor tag
aBox.append(imgCon, mPCon);

//delete cart section
//this is delete cart container
let cartCon2 = document.createElement('div');
//adding classlist to delete cart container
cartCon2.classList.add('cart-container2');
//tjis is delete cart button
let caBtn2 = document.createElement('button');
//adding classList to delete cart button
caBtn2.classList.add('cart-button');
//this is delete cart button image tag
let cartIm2 = document.createElement('img');
//setting src of delete cart button image tag
cartIm2.src = deleteCartImgSource;
//adding classlist to delete cart image tag
cartIm2.classList.add('cart');
//appending delete cart image in delete btn
caBtn2.append(cartIm2);
//appending delete btn to delete btn container
cartCon2.append(caBtn2);
//appending anchor and delete btn container in box sub container
bCon.append(aBox, cartCon2);
//appending box sub container to main box con
mainB.append(bCon);
//appending main box con to items container
itemCon.append(mainB);
//this is index number for array
//help to delete product when clicked to delete btn
let indexNo = index;


//remove from cart logic
//event listener on delete btn container
cartCon2.addEventListener('click', ()=>{

//getting product array and reversing it
let parsedArr2 = JSON.parse(localStorage.getItem('parr')).reverse();

//its value= ('../assets/shirt1.png' = 'yes')
let ItemRemove = parsedArr2[indexNo].pImg;

//removing ('../assets/shirt1.png' = 'yes')
//by this se are telling that this element is  not present in array now
localStorage.removeItem(ItemRemove)

//delete the object whose index no is = indexNo
delete parsedArr2[indexNo];
 
//filtering undefined object from array & returning it
let newArr = parsedArr2.filter((ele)=>{
 //return the element that is not = undefined
 return ele != "undefined";
});//filter method on history array

//reversing and converting the returned array from filter method, to string
//if se dont reverse it them it will create a small problem
let newstr = JSON.stringify(newArr.reverse());
//setting the new stringified array to local storage
localStorage.setItem('parr', newstr);


//reloading the page 
location.reload();
});//eventListener for delete btn

});//for each on productArr
}//function append
//calling append function
append();





//========================================
//when you click on any product then..
//making go to slider-page-functionality
//========================================
let abox = document.querySelectorAll('.a-box');

//for each on all product boxes to add event listeners on that
Array.from(abox).forEach((ele, index)=>{
//it will be index for clicked product
let indexNum = index;

//adding event lostener to all product box
ele.addEventListener('click', ()=>{
 
 
 //object = to clicked element ka object from  productsArr  array
 let object = reversed[indexNum];
 //stringifying that object
 let string = JSON.stringify(object);
 //setting that to local storage 
 //so that images path will be extracted from here
 localStorage.setItem('forSlider', string);
 
 //preparing array that contain images for slider
 //extracting images from object(object or clicked product)
 let suggest1 = object.spSec.suggest.a;
 let suggest2 = object.spSec.suggest.b;
 let suggest3 = object.spSec.suggest.c;
 let suggest4 = object.spSec.suggest.d;
 //making an array for extracted images
 let suggestArr = [
  productsArr[suggest1],
  productsArr[suggest2],
  productsArr[suggest3],
  productsArr[suggest4],
 ];
 //stringifying that images array
 let str2 = JSON.stringify(suggestArr);
 //saving that stringified images array
 localStorage.setItem('sugfesrArr', str2);
 //redirecting to slider page
 //so that the details clicked product will be displayed there
 location.href='../html-folder/slider.html'
});//event listener on ele
});//forEach loop on products
