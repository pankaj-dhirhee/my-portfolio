//variables

//getting object the object is a object taken from product array
let data = localStorage.getItem('forSlider');
//parsing tha array
let parsed = JSON.parse(data);

//getting an array which contain four objects taken from product array it will be used to display suggestion product
let suggest = localStorage.getItem('sugfesrArr');
//parsing that array
let parsed2 = JSON.parse(suggest);

//empty array,
//here objects will be pushed, that object contains image path to ne displayed in sp slider
localStorage.setItem('spSliderArr', '[]')

//this is add cart image
let addCartImgSource = '../assets-folder/cart.png';

//this is delete cart image
let deleteCartImgSource = '../assets-folder/delete-cart.png';

//slider container for mobile
//mere image boxes will ne append
let boxCon = document.querySelector('.slider-container');

//this is paragraph(span) to display price
let pricePara = document.getElementById('product-price')

//here product name will ne displayed
let productNamepara = document.getElementById('product-name');

//here text will ne displayed that tells something about that product
let aboutPara = document.getElementById('product-detail-paragraph-mobile');

//here suggestion product boxes will ne append
let suggestCon = document.getElementById('suggestion-container');

//i dont know
let sliderMainCon = document.getElementById('slider-main-container');

//getting and parsing a product array it contains all product array
let proArr = JSON.parse(localStorage.getItem('pArr'));
//=======================================




//========================================
//adding images to slider(mobile-slider)
//========================================
//for each on sliderimages of sp-section of a object of productArr
parsed.spSec.sliderimages.forEach((ele, i)=>{ 
 let box = document.createElement('div');
 box.classList.add('image-box');
 let img = document.createElement('img');
 img.src = ele.img;
 box.append(img);
 boxCon.append(box);
 
 //---------------------------------------
 //preparing array for sp-slider
 //here array contains objects that contains images fir slider
 let spSliderArr = JSON.parse(localStorage.getItem('spSliderArr'));
 
 //here this object will be created many times. each time it will be pushed to sp-slider array
 let obj = {
  img: ele.img,
 };
 //pushing object to sp-slider array
 spSliderArr.push(obj)
 
 //stringifying that sp-slider array each time.
 let string = JSON.stringify(spSliderArr);
 //saving that stringified array each time.
 localStorage.setItem('spSliderArr', string)
 
});//for Each




//========================================
//displaying the name of product
productNamepara.innerText = parsed.spSec.name;
//========================================

//========================================
//displaying the price of product
pricePara.innerText = parsed.Price;
//========================================

//========================================
//displaying the text about that product
aboutPara.innerText = parsed.spSec.about;
//========================================




//========================================
//suggest section
//========================================
//appending suggested products to suggestion container
parsed2.forEach((obj, index)=>{
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
suggestCon.append(mainB);
//this is index number for array
let indexNo = index;


//calling cart function
caBtn.addEventListener('click', (e)=>{
//sending the argument index no with it
cart(`${indexNo}`);
});//event listener on cart btn
});//for each on productArr





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
 let object = parsed2[e];
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
//when you click on suggested box img then...
//========================================
//getting all the suggestion product boxes
let abox = document.querySelectorAll('.image-container');

//for each on all suggestion product boxes to add event listeners on that
Array.from(abox).forEach((ele, index)=>{
//it will be index for clicked product
let indexNum = index;

//adding event lostener to all suggestion product box
ele.addEventListener('click', ()=>{
 
 //parsed2 is four objects that had come from    product section (when we had clicked a product)
 //it contains four suggested product object
 //object = to clicked element ka object from suggestion array
 let object = parsed2[indexNum];
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
  proArr[suggest1],
  proArr[suggest2],
  proArr[suggest3],
  proArr[suggest4],
 ];
 //stringifying that images array
 let str2 = JSON.stringify(suggestArr);
 //saving that stringified images array
 localStorage.setItem('sugfesrArr', str2);
 //redirecting to slider page
 //so that the details clicked product will be displayed there
 location.href='../html-folder/slider.html'
});//event listener on ele
});//forEach loop on suggestion product 

