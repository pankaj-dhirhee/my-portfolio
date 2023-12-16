//-----Variables-----//
//this is container or delete button
let delBox = document.getElementById("delete-box-for-three-dot");

//it store responce array when it fetched
let data = JSON.parse(localStorage.getItem("history")).reverse();

//idAsIndex is setted or not default value(0)
valSetted = true;

//if it is true then when you click anywhere then delete btn will hide
let touched = false;

//if it is true then when you click anywhere then delete btn will hide
let touchedDeleteAll = false;

//api key
let api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";
 
 //used to fetch channel logo
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

//here video boxes will be append
let container = document.getElementById('videos-container');

//this is delete button
let delBtn = document.querySelector('.delete-btn');
 
//delete all btn ka container contain btn tag
let deleteAllBtnCon = document.getElementById('delete-box-to-delete-all-history');

//delete all btn tag
let deleteAllBtn = document.querySelector('.delete-all-history-btn');

//three dots on the navbar
let threeDotOfNav = document.getElementById("nav-dot");

//container of 'delete specific vid' button
let deleteSpBtnCon = document.getElementById('delete-box-for-three-dot');

//if it is true then only on clicking on thumbnail can redirect you to video play page
let touchPermissinOnVideoBoxThumbnail = false;
//--------------------------------------





//----fetching logo or channel----//
//feching and appending channel logo
//---append logo---
function appendLogo(LogoUrl, id){
 //getting Logo image tag
 //its id = channelId + thumbnail url
 let LogoImg = document.getElementById(id);
 LogoImg.src = LogoUrl;
 
 //stringifying the logo url
 let logoStr = JSON.stringify(LogoUrl);
 //storing channel logo url
 //used to display channel logo in video page
 localStorage.setItem('logoData', logoStr)
}//function appendLogo


//---start the process of fetching logo---
function startFetchingLogo(id, remove){
 //getting channel id
 let channelId = id;
 
 //fetching url or logo
 const fetchLogo = (chId)=>{
  fetch(channel_http + new URLSearchParams({
    key: api,
    part: 'snippet',
    id: chId,
    maxResults: 1,
  }))
  
  //responce of fetchLogo
  .then(res => res.json())
  
  //storing logo url to video_data object
  //and calling append channel logo
  .then(data =>{
  
    //in this object channel-Logo will stored
let video_data = {};
    
    //storing logo url to video_data object;
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    //getting logo from video_data obj
    let logo = video_data.channelThumbnail;
    //calling appendLogo
    //arguments = logo-url and channelId + thumbnail url
    appendLogo(logo, id+remove);
  })//.then(data =>{
  
 }//fetchLogo func (const fetchLogo = (chId))
 //calling fetchLogo function
 fetchLogo(id);
}//function startFetchingLogo
//--------------------------------------



 

//---Id generator function---//
//this will generate id for delete btn
//id will decide that which object will remove from history array
function IdAsIndex(){
 //it is value like 1, 2, 3
 //incremented value
 let val = localStorage.getItem("idToDot");
 
 //if idToDot is not in localStorage then set it
 if(valSetted != false){
  //value = no of obj present in history arr
  localStorage.setItem("idToDot", JSON.stringify(data.length));
 };//if else condition
 
 //now idToDot is saved in localStorage
 valSetted = false
 
 //get the value of id to dot from L-Storage
 let nVal = localStorage.getItem("idToDot"); 
 //convert idToDot into a integer(number);
 let valInt = parseInt(nVal);
 //add 1 to that converted idToDot number
 let incremented = valInt-1;
 //set incremented value to localStorage
 localStorage.setItem("idToDot", incremented);
  //return the incremented value
  return incremented;  
};//IdAsIndex function
//--------------------------------------
 
 
 
 
//----appending videos function----//
function appendVideos(data){
 //this will generate id for delete btn
 //id will decide that which object will remove from history array
 function IdAsIndex(){
  //getting value that is setted by IdAsIndex()
  let val = localStorage.getItem("idToDot");
 
  //if idToDot is not in localStorage then set it
  if(valSetted != false){
   //value = no of obj present in history arr
   localStorage.setItem("idToDot", JSON.stringify(data.length));
  };//if else condition
 
  //now idToDot is saved in localStorage
  valSetted = false
 
  //get the value of id to dot from L-Storage
  let nVal = localStorage.getItem("idToDot"); 
  //convert idToDot into a integer(number);
  let valInt = parseInt(nVal);
  //add 1 to that converted idToDot number
  let incremented = valInt-1;
  //set incremented value to localStorage
  localStorage.setItem("idToDot", incremented);
  //return the incremented value
  return incremented;  
 };//IdAsIndex function
 
 
 
 //makeling video box for objects inside responced 
 data.forEach((item)=>{
  //video box for append thumbnail Img con
  let div = document.createElement('div');
  div.classList.add('video-box')
  
  //thumbnail con for event listener
  let con = document.createElement('div');
  con.classList.add('image-con');
  
  //thumbnail image
  let thumbnailImg = document.createElement('img');
  thumbnailImg.src = item.snippet.thumbnails.high.url;
  
  //appending thumbnail image tag in its con
  con.append(thumbnailImg);
  //appending thumbnail con to video box
  div.appendChild(con)
  
  
  //inner html for video box
  div.innerHTML +=`  
  <!--bottom section-->
  <div class="bottom-con">
    <!--channel logo container-->
    <div class="channel-image-con">
      <img src="" class="logo-img-tag" id="${item.snippet.channelId}${item.snippet.thumbnails.high.url}"/>
    </div>
  
    <!--paragraphs container-->
    <div class="para-con">
      <!--video title-->
      <span class="title">
       ${item.snippet.title} 
      </span>
   
    <!--channel-name, views, upload-time con-->
    <span class="channel-name-views-con">  
      <!-- wrapper -->
      <div class="wrapper">
        ${item.snippet.channelTitle} • 300k views • 1 year ago
      </div>
   </span>
  </div>
  
  <!-- three dots container -->
  <div class="dot-con">
   <img src="../assets/3dot.png" class="dot" id="${IdAsIndex()}">
  </div><!-- dots container -->
  </div>
  `;
  container.append(div)
  
  //calling startFetchingLogo
  //arguments = channelId and Thumbnail url
  startFetchingLogo(item.snippet.channelId, item.snippet.thumbnails.high.url);
 

  
  
  //when you click on video box then...
   div.querySelector('.image-con').addEventListener('click', ()=>{
   //----storing logo for video page----
   let logo = div.querySelector('.logo-img-tag').src;
   //stringifying the logo url
   let logoStr = JSON.stringify(logo);
   
   //storing channel logo url
   //used to display channel logo in video page
   localStorage.setItem('logoData', logoStr);
   //storing the data of clicked video to local storage 
   //used to add in watch history
   localStorage.setItem("video", JSON.stringify(item));   
     
   //redirecting to video page
   window.location.href="video.html"
  });//div par event listener
 })//forEach
}//function appendVideos
appendVideos(data);





//----handling all three dots click----//
//part1 hadling three dot of video box
//when you click on three dot of video box, then show the delete button 
//getting all image tag or three dot
//image tags of three dot
let dot = document.querySelectorAll(".dot");
dot.forEach((image)=>{ 
 //event listeners on all three dot img tag
 image.addEventListener("click", (e)=>{
  console.log('show')
  //show the delete box
  delBox.style.display = "inline-block" 
  //giving bottom position to con of delBtn
  delBox.style.bottom = "1%";
 
  //getting id of clicked 3dot img tag
  let index = (e.target.id);
  //ging id of 3dot img tag to deleteBtn
  delBtn.setAttribute("id", index)
  let touched = false;
 });//event listener on all 3dot img tag
});//forEach loop to all 3dot img tag


//part2 handling three dot of navbar
threeDotOfNav.addEventListener('click', ()=>{
 //show the delete box
 deleteAllBtnCon.style.display = "inline-block"
 //giving bottom position to con of delBtn
 deleteAllBtnCon.style.bottom = "1%";
 touched = false;
});//eventListener on nav three dot
//--------------------------------------





//----handling all delete buttons----//
//if you click on delete btn then remove that video from watch history
//part1 delete btn for deleting specific video
//event listener on delete button
delBtn.addEventListener('click', ()=>{
 //get the id or delete button
 let index = (delBtn.id);
 
 //get the history array from localStorage
 let arr = JSON.parse(localStorage.getItem("history"));
 
 //deleteBtn ke id ke value ka position ka object ko lelo for deleting
 let obj = arr[index];
  
 //get the image url from that object
 let rem = JSON.stringify(obj.snippet.thumbnails.high.url);
  
 //remove the element that's key = url or that object. 
 //because if we dont remove that element then that video will never added again to history array, because of a logic
 localStorage.removeItem(rem);
 
 //deleteBtn ke id ke value ka position ka object ko delete kar do, (this will return null value to position of deleted object)
 delete arr[index];

 //return a new array. in that array indefined element will removed
 let newArr = arr.filter((ele)=>{
   //return the element that is not = undefined
   return ele != "undefined";
 });//filter method on history array
  
 //set that new array returned by filter method to local storage
 localStorage.setItem("history", JSON.stringify(newArr));
  
 //get that new array that is resently returned by filter method from local storage
 let data2 = JSON.parse(localStorage.getItem("history"));
  
 //calling the append function again
 appendVideos(data2);
  
 //if history array is empty then remove it from local storage
 if(data2.lengh == 0){
   localStorage.removeItem('history')
 };//if else condition
  
 //reload the page so that deleted video will not ne displaying
 location.reload()
  
 //it gives permission to hide the delete button
 touched = false;
});//event listener on delete button



//part2 delete btn for deleting all history
deleteAllBtn.addEventListener('click', ()=>{
 //remove tha history array from local storage
 localStorage.removeItem("history");
 
 //removing saved video imgurl from localStorage
 //so that they can add again in history
 data.forEach((obj)=>{
  //all data ka obj ka image url
  let ImgUrl = obj.snippet.thumbnails.high.url;
  localStorage.removeItem(ImgUrl);
 });//for each on data

 location.reload();
});//event listener on delete all button
//--------------------------------------





//----hiding delete buttons----//
//part1 hide 'delete all button'
//when touching on body
document.querySelector('body').addEventListener('touchstart', ()=>{
 if(touchedDeleteAll != false){
  setTimeout(()=>{
    if(touchedDeleteAll != false){
      //giving botton position to delete box
      deleteAllBtnCon.style.bottom = "-15%";
      //hide the delete box
      deleteAllBtnCon.style.display = "none";
      touchedDeleteAll = false;
    };//if condition
  }, 5);
 }//if condition
 else{
  touchedDeleteAll = true;
 }
});//touchstart event listener on body


//part2 hide 'delete specific video button'
//when touching on body
document.querySelector('body').addEventListener('touchend', ()=>{
 console.log(touched)
 if (touched != false){
   setTimeout(()=>{
     if(touched != false){
       //giving botton position to delete box
       deleteSpBtnCon.style.bottom = "-15%";
       //hide the delete box
       deleteSpBtnCon.style.display = "none";
     };//if condition
     touched = false;
     console.log(touched)
   }, 15);//setTimeOut
} //if condition
else{
 touched = true;
 console.log(touched)
}
});//touchstart event listener on body
//--------------------------------------
