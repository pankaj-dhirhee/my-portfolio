let productsArr =[
 //==========its index is 0===========//
 {
  pImg: '../assets-folder/mens-bleasure1.png',
  name: 'mens bleasure',
  Price: '₹800',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure1.png',
     },
     {
     img: '../assets-folder/specific-bleasure1.png',
     },
     {
     img: '../assets-folder/specific-bleasure2.png',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 1,
    b: 2,
    c: 3,
    d: 4,
   },//suggest
  },//spSec
 },
 //==========its index is 1===========//
 {
  pImg: '../assets-folder/mens-bleasure2.png',
  name: 'mens bleasure',
  Price: '₹900',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure2.png',
     },
     {
     img: '../assets-folder/specific-bleasure3.png',
     },
     {
     img: '../assets-folder/specific-bleasure4.png',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 0,
    b: 2,
    c: 3,
    d: 4,
   },//suggest
  },//spSec
 },
 //==========its index is 2===========//
 {
  pImg: '../assets-folder/mens-bleasure3.png',
  name: 'mens bleasure',
  Price: '₹1000',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure3.png',
     },
     {
     img: '../assets-folder/specific-bleasure5.jpg',
     },
     {
     img: '../assets-folder/specific-bleasure6.jpg',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 1,
    b: 2,
    c: 3,
    d: 4,
   },//suggest
  },//spSec
 },
 //==========its index is 3===========//
 {
  pImg: '../assets-folder/mens-bleasure4.png',
  name: 'mens bleasure',
  Price: '₹800',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure4.png',
     },
     {
     img: '../assets-folder/specific-bleasure7.png',
     },
     {
     img: '../assets-folder/specific-bleasure8.png',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 0,
    b: 1,
    c: 2,
    d: 4,
   },//suggest
  },//spSec
 },
 //==========its index is 4===========//
 {
  pImg: '../assets-folder/mens-bleasure5.png',
  name: 'mens bleasure',
  Price: '₹939',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure5.png',
     },
     {
     img: '../assets-folder/specific-bleasure9.png',
     },
     {
     img: '../assets-folder/specific-bleasure10.png',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 0,
    b: 1,
    c: 2,
    d: 3,
   },//suggest
  },//spSec
 },
 //==========its index is 5===========//
 {
  pImg: '../assets-folder/mens-bleasure6.png',
  name: 'mens bleasure',
  Price: '₹1260',
  spSec:{
   name: 'mens home wear bleasure',
    sliderimages:[
     {
     img: '../assets-folder/mens-bleasure6.png',
     },
     {
     img: '../assets-folder/specific-bleasure12.png',
     },
     {
     img: '../assets-folder/specific-bleasure13.png',
     },
    ],//slider images
   about: 'This bleasure is comfortable to wear. You can wear this bleasure in partys  without any problem. This blesure is of light colour.',
   suggest:{
    a: 1,
    b: 2,
    c: 3,
    d: 4,
   },//suggest
  },//spSec
 },
];
//=========================================



//=========================================
//storing array in localStorage for suggested  section
localStorage.setItem('pArr', JSON.stringify(productsArr));
//=========================================





//=========================================
//variables
//this is add cart image
let addCartImgSource = '../assets-folder/cart.png';

//this is delete cart image
let deleteCartImgSource = '../assets-folder/delete-cart.png';

//this is item container
//hereProdects will be append
let itemCon = document.getElementById('items-container');

//if product array is setted then its value will be yes
let saved = localStorage.getItem('save');
//=========================================



//=========================================
//if product array is not setted then set it 
//saving empty array where cart products will be pushed when you click on add to cart button
if(saved != 'yes'){
 let empty = [];
 let strme = JSON.stringify(empty);
 localStorage.setItem('parr', strme);
 //value yes because now array is setted
 localStorage.setItem('save', 'yes')
}//if condition
//=========================================




//=========================================
//add to cart function
//=========================================
//here 'e' is index value of clicked delete btn
function cart(e){
 //getting product array
 let pArray = localStorage.getItem('parr');
 //parsing product array
 let parsed = JSON.parse(pArray);
 //getting object its index = 'e'
 let object = productsArr[e];
 //checking, is that product already added?
 let addedOrNot = localStorage.getItem(object.pImg)
 
 
 //if That product is not already added then
 if(addedOrNot != 'yes'){
  //pushing that product array
  parsed.push(object);
  //setting 'yes', that this product is added
  //so that it will not able to add 2times
  localStorage.setItem(`${object.pImg}`, 'yes');  
  //calling show notification functio
  showNotification();
 }//if condition

 //else, means if if product array setted 
 //then show the notification that this is 
 //already added in your cart
 else{
  //calling notification async async function 
  //with an argement alreadyAdded
  //wo that it can show notification,-
  //already added
  showNotification('alreadyAdded');
 };//else condition
 
 
 //this is new array where new obj was pushed 
 let str2 = JSON.stringify(parsed);
 //setting the new pushed array
 localStorage.setItem('parr', str2);
}//cart function




//========================================
//added to cart notification function
//========================================
//displaying notification when items is added to cart
function showNotification(argu){
 
//getting appear-cart-container or notification box container
let a = document.getElementsByClassName('appear-cart-container')[0];

//it contains text to ne displayed
let appearBox = document.getElementsByClassName("appear-box")[0];


//if agu = alreadyAdded thenn...
if(argu == 'alreadyAdded'){
 
 //changing the inner text of appear box
 let text = "This item is already in your cart";  
 appearBox.innerText =  text;
}//if condition

//else, means agu not= alreadyAdded then...
else{
 //changing the inner text of appear box
 let text = "your item is added to cart";  
 appearBox.innerText =  text;
};//else condition



//adding class -> came to appear cart container
a.classList.add('came');

//making function to remove class -> came from appear-cart-container or variable 'a'
function remove(){
 a.classList.remove('came')
};//function  renove()

//running remove function after 2 seconds when user clicked to add to cart button
setTimeout(remove, 2000);
 
};//show notification function 
//========================================



//========================================
//generating html for each array obj
//========================================
productsArr.forEach((obj, index)=>{
//this is main outer parent for product box
let mainB = document.createElement('div'); 
//adding classlist to main outer parent           
mainB.classList.add('box-main-container');
//this is box sub container
let bCon = document.createElement('div');
//adding classlist to box sub container
bCon.classList.add('box-container');
//this is span tag
//span for going to sp product page
let aBox = document.createElement('span');
//giving classList to aBox
aBox.classList.add('a-box');
//this is product image container
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
//this is price para
let price = document.createElement('span');
//adding classList to pricr para
price.innerText = obj.Price;
//appending 'users-choice-para' and 'product para' to sub product para container
pCon.append(userChoP, proPara, price);
//appending sub product para container to main product container
mPCon.append(pCon);
//appending 'image-container' and  'main-para-container' unside span tag
aBox.append(imgCon, mPCon);

//container for add to cart button
let cartCon1 = document.createElement('div');
//adding classlist to add to cart btn con
cartCon1.classList.add('cart-container');
////adding another classlist to add to cart btn con
cartCon1.classList.add('add-cart');
//add to cart button
let caBtn = document.createElement('button');
//adding classlist to add to cart btn
caBtn.classList.add('cart-button');
//this is add to cart image tag
let cartIm = document.createElement('img');
//setting src or add to cart image tag
cartIm.src = addCartImgSource;
//adding classlist to add cart image tag
cartIm.classList.add('cart');
//appending add cart image tag to cart btn
caBtn.append(cartIm);
//appending cart button to add cart container
cartCon1.append(caBtn);
//appending aBox and add cart container to box sub container
bCon.append(aBox, cartCon1);
//appending box sub container to main box container
mainB.append(bCon);
//appending main box inside item container
itemCon.append(mainB);
//this is index number for array
let indexNo = index;


//calling cart function
caBtn.addEventListener('click', (e)=>{
//sending the argument index no with it
cart(`${indexNo}`);
});//event listener on cart btn
});//for each on productArr




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
 let object = productsArr[indexNum];
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
