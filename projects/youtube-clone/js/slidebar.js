//== Variables ==//

let threeLinesOnNav = document.getElementById("three-line-icon");

// main container or left slider
let leftSlider = document.querySelector(".slidebar-container");

//----------------------------------------------//



//== Event listener to hide & show slider nav on click of three lines ==//
threeLinesOnNav.addEventListener('click', ()=>{
  leftSlider.classList.toggle("show-the-slidebar-container")
});
