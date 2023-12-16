//== Variables ==//
// Object of project 
// contains all data about project 
let objectOfProject = JSON.parse(sessionStorage.getItem('objectOfProject'));

// Project image (tag)
let projectImageTag = document.querySelector('#project-image');

// Project name (tag)
let projectName = document.querySelector('#project-name');

// Anchor tag to see project
let anchorOfViewProjectButton = document.querySelector('#anchor-to-see-project');

// Slider boxes container
let sliderBoxContainer = document.querySelector('.slider-container');

// Pragraph (About project)
let paragraphAboutProject = document.querySelector('.paragraph-about-project');
//=================================================//




function renderAllThings(){
  
   //** Part 1 => Render Details of section 1 **//
   
   // Loading project logo
   projectImageTag.src = objectOfProject.projectLogoUrl;
   // Loading project name
   projectName.innerText = objectOfProject.projectName;
   // Setting href of View button
   anchorOfViewProjectButton.href = objectOfProject.projectLink;
  
  
   //----------------------------------------//
   
   
   //** Part 2 => Prepare slider img box & append **//
   
   // ForEach loop
   objectOfProject.projectPreviewImages.forEach((projectPreviewImage)=>{
      sliderBoxContainer.innerHTML += `
        <div class="image-box" id="box1"> 
            <img src="${projectPreviewImage}"/>
        </div>
      `;
   });//foeEach
   
   
   //----------------------------------------//
   
   
   //** Part 3 => Paragraph about project **//
   
   // Loading paragraph about project
   paragraphAboutProject.innerText = objectOfProject.paragraphAboutProject;
   
   //----------------------------------------//
}//Function
//calling a function
renderAllThings();
