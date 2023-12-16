//== Variables ==//
//container or loader
let containerOfLoader = document.querySelector('.loader-container');
//---------------------------------------//



//==== Hiding loader srcreen ====//
window.onload = function (){
  setTimeout(()=>{
    containerOfLoader.style.display = 'none';
  }, 400)
};
