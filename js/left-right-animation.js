//==== Variables ====//
// Box-1 of our clients aection
let clientBox1 = document.querySelector('.client-box1');
// All clients-box
let allClientBox = document.querySelectorAll(".box")
let hide = true;
let callFunction = true;

function AnimateClientBox(){
 if (hide == true){
  clientBox1.style.
  console.log('hellhhho')
  hide = false;
 }
 else{
  clientBox1.style.display = "flex"
  hide = true;
  console.log('hello')
 }
 
}

setInterval(()=>{
 if(callFunction == true){
  //AnimateClientBox()
 }
}, 2000);


Array.from(allClientBox).forEach((box)=>{
  box.addEventListener('touch-start', ()=>{
   clientBox1.style.display = "flex"
   callFunction = false;
  })
});

