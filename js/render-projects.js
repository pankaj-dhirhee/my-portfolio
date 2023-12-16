//== Variables ==//
// Projects array
let arrayOfProjects = JSON.parse(sessionStorage.getItem("projectsArray"));

// Container of project boxes
let ContainerOfProjectBox = document.querySelector(".project-boxes-container");
//===============================================//



// Preparing project box & displaying it //
function prepare_and_append_project_box(){
  /* For each loop on projects array */
  arrayOfProjects.forEach((projectObject)=>{
      
      
      //** preparing & displaying project box **//
      //project box for event listener
      let projectBox = document.createElement('div');
      projectBox.classList.add("project-boxes");
      
      //Setting innerHTML of project box
      projectBox.innerHTML = `
        <!-- box -->
        <div class="project-boxes">
           <!-- project image -->
           <img src="${projectObject.projectBannerImage}" class="project-img"/>
      
           <!-- Project name -->
           <span class="project-name">
              ${projectObject.projectName}
           </span>
      
           <!-- Project creator name -->
           <span class="creator-name-of-project">
              Created by
              <br>
              Pankaj Dhirhee
           </span>
       
           <!-- see project button -->
           <!-- styled in navabar.css (contact us button) -->
           <button class="universal-btn see-project-button">
              <span>See project</span>
              <img src="../assets/right-arrow.png" alt="Three-Lines"/>
           </button>
        </div><!-- box -->
      `;
      
      //Appending box to its container
      ContainerOfProjectBox.append(projectBox);
      
      //----------------------------------------//
      
      //Event listener on projectBox
      //getting see project button from projectBox
      let seeProjectBtn = projectBox.querySelector('.see-project-button')
      seeProjectBtn.addEventListener('click', ()=>{
         
         //object or project
         let objectOfProject = projectObject;
         //saving object or project in session-storage
         //saving => for project preview page
         sessionStorage.setItem("objectOfProject", JSON.stringify(objectOfProject));
         
         //** Redirecting to project preview page **//
         location.href = "project-preview-page.html"
      });//event listener
      
 
  });//ForEach loop
}//Function
// Calling prepare_and_append_project_box Function //
prepare_and_append_project_box();
