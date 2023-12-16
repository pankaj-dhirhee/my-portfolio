//== Variables ==//
// object of project
let objectOfProject = JSON.parse(sessionStorage.getItem('objectOfProject'));

// image boxes container
let containerOfImgeBox = document.querySelector('.image-boxes-container');
//================================================//




//** Preparing image box and displaying **//
function prepareAndDisplayImageBox(){

   // ForEach loop
   objectOfProject.projectPreviewImages.forEach((projectPreviewImage)=>{
      containerOfImgeBox.innerHTML += `
        <div class="image-box" id="box1"> 
            <img src="${projectPreviewImage}"/>
        </div>
      `;
   });//foeEach
   
}//Function
//Calling function
prepareAndDisplayImageBox();
