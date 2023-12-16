//==== Variables ====//
// Fab icon button
let fabIconButton = document.querySelector('.fab-icon-btn');
// Dropdown Links Container
let dropDownLinksContainer = document.querySelector('.sec4-Dropdown-Links-container');
// nav bar
let nav = document.querySelector('nav');


//==== Enent Listener to hide & show Dropdown Links ====//
fabIconButton.addEventListener('click', ()=>{
 let heightOfNav = nav.getBoundingClientRect();
 heightOfNav = heightOfNav.height;
 console.log(heightOfNav)
 dropDownLinksContainer.style.top = `${heightOfNav}px`;
 
 dropDownLinksContainer.classList.toggle('hide-dropdown-link');
});


