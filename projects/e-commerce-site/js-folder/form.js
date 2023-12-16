//making patment done animation
//grabing form container
let form = document.getElementById('form-container');

let animation = document.getElementById('patment-img');



//adding event listener in form or submit
form.addEventListener('submit', function (event){

//preventing from auto submit
event.preventDefault()

//display none or form when it submitted
form.style.display = 'none';
});
