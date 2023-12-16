//** Projects array **//
let projectsArray = [
  //Project 1 youtube clone
  {
     projectBannerImage: '../assets/youtube.png',
     projectName: 'YOUTUBE CLONE',
     projectLogoUrl: '  ../assets/youtube-project-logo.png',
     
     // project preview images
     projectPreviewImages: [
       "../assets/yutube-project-peview-image1.png",
       "../assets/yutube-project-peview-image2.png",
       "../assets/yutube-project-peview-image3.png",
     ],
     
     //paragraph about project
     paragraphAboutProject: "This project Youtube clone is created by pure Html, Css and Javascript. In this project data is comming through Youtube api.",
     
     //project production link
     projectLink: '../projects/youtube-clone/index.html'
  },
  //--------------------------------------------//


  //Project 2 => music website
  {
     projectBannerImage: '../assets/music.png',
     projectName: 'MUSIC WEB APP',
     projectLogoUrl: '  ../assets/music.png',
     
     // project preview images
     projectPreviewImages: [
       "../assets/music-web-preview-image1.png",
       "../assets/music-web-preview-image2.png",
     ],
     
     //paragraph about project
     paragraphAboutProject: "This music web app is created by pure Html, Css and Javascript. this project is no completed yet.",
     
     //project production link
     projectLink: '../projects/music-web/index.html'
  },
  //--------------------------------------------//
]
//===============================================//



//** Saving 'Projects Array' in session storage **//
let stringifiedProductArray = JSON.stringify(projectsArray);
sessionStorage.setItem('projectsArray', stringifiedProductArray);
