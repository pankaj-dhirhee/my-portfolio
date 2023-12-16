//----variables----//
//navbar
let navbar = document.getElementById('navbar');

let lastScrollTop = 0;

let body = document.getElementById('videos-container')



body.addEventListener('scroll', ()=>{
 console.log('hello')
 let scrollTop = body.pageYOffset || document.documentElement.scrollTop;
 
 if(scrollTop > lastScrollTop){
  navbar.style.display = "none";
 }else{
  navbar.style.top = "0";
 }
});//event listener
