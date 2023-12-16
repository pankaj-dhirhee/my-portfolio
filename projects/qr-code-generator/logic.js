let inputBox = document.getElementById("input-box");

let imgBoxForQr = document.getElementById("qr-code-image-box")

let ImgForQr = document.getElementById("qr-img-tag");

let generateBtn = document.getElementById("generate-btn");



//=======================================
//if you click on generate button then generate qr code
//=======================================
generateBtn.addEventListener("click", ()=>{
let query = inputBox.value;

//qr code' image url will come through this
 let data = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${query}`;

//if inputBox is empty then 
if(inputBox.value == ""){

 inputBox.placeholder = "Please enter here something"; 
}//if condition

//means if inputBox is not empty then
else{
 setTimeout(()=>{
  ImgForQr.src= data;
 }, 100)
  
  //if img.src is seted then..
 if (ImgForQr.src != ""){
  setTimeout(()=>{
   imgBoxForQr.classList.remove("hide");
   imgBoxForQr.classList.add("show")
  }, 2000)
 }//if else
}//else condition

});//event listener on generate btn
