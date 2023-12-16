let api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";

//it will get clicked video data from local storage
let data = JSON.parse(localStorage.getItem('video'));

//same as 'allData'
//contains all required datas
//like => subscribers, totalvideo number
let viewsData = JSON.parse(localStorage.getItem("itemOfAllData"))

//this is a object, coming from video page
//this will be used to get channel id
let dataOfVidPage = JSON.parse(localStorage.getItem('video'));

//this is channel id
let channelId = dataOfVidPage.snippet.channelId;

//url to fetch playlist
let playlist_http = ` https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=6&key=${api}`

let cProfile = document.getElementById('c-profile');

//channel log url 
let channelLogoUrl;

//all options like videos, playlists
let optionBox = document.querySelectorAll('.option-box');

//used to fetch channel logo
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

//logo of channel will display (img tag)
let channelProfile = document.getElementById('c-profile');

//span for channel name on nav
let channelNameOnNav = document.getElementById('channel-name-on-nav');

//span of subscribersCount
let subscribersSpan = document.getElementById('subscribers');

//channel name span on detail sec
let channelNameP = document.getElementById('cha-name');

//work as subscribe button
let subscribeBox = document.getElementById("subscribe-btn");

//span tag under subscribe btn or box
let subscribePara = subscribeBox.querySelector("span");

//container for video boxes
let container = document.getElementById('videos-container');
//--------------------------------------





//---handling channel details section----
//displaying subscribers & total videos
subscribersSpan.innerText = `Subscribers ${viewsData.subscribers}  •  Videos ${viewsData.totalVideosOfChannel}`
//--------------------------------------





//----handling options click event-----
Array.from(optionBox).forEach((item)=>{
 //event listener on all option box
 item.addEventListener('click', (e)=>{
 
 //id of clicked option
 let txt = e.target.id;

 //if id of clicked option = 'playlist-option'
 //then call fetch playlist function
 if(txt == 'playlist-option'){
  //empty the videos containet  
  document.getElementById('videos-container').innerHTML = '';
  fetchPlaylist()
 }
 //if id of clicked option = 'videos-option'
 //then call fetch video function  
 else if(txt == 'videos-option'){
 //empty the videos containet  
  document.getElementById('videos-container').innerHTML = '';
   homeVideos();
 }//if condition
 else{}
  
 //first border none or all options
 Array.from(optionBox).forEach((item)=>{
  item.style.borderBottom = 'none'
 });//Array.from(optionBox)
  
 //then borderBotton visible of clicked option
 e.target.style.borderBottom = '2px solid black';  
 });//event listener on item (clicked)
});//forWach on optionBox
//--------------------------------------





//---displaing channel names---//
//both on nav & channel detail sec
//getting Name of channel
let channelName = dataOfVidPage.snippet.channelTitle;
//displaying Name of channel
channelNameP.innerText = `${channelName}`

//----displaing channel name on nav----
channelNameOnNav.innerText = `${channelName}`
//--------------------------------------





//---fetching videos of channel---//
async function homeVideos(){
try{
 //this is query or video
 let query = `${channelName} `
 
 //fetching channel data from youtube api
 let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${query}&key=${api}`);

 
 //this will store the fetched json object 
 let data = await res.json();
 
 //getting name of channel
 //so that we can use outside this function
 localStorage.setItem('suggest', data.items[0].snippet.channelTitle)
  
 //calling the appent videos function
 appendVideos(data.items)
}//try
catch(err){
   setTimeout(()=>{
     //this function will load videos
     homeVideos()
   }, 4000)
 }
}//function homeVideos()
homeVideos()



//---channel logo function---//
let logo_http = 'https://www.googleapis.com/youtube/v3/channels?';

//in this object channel-Logo will store
let video_data = {};
//this will true when Logo is setted in channel detail section on top
let setted = false;


//---append logo function---
function appendLogo(LogoUrl, id){
 //getting Logo image tag
 //its id = channelId + thumbnail url
 let logoImg = document.getElementById(`${id}`);
 try{
   logoImg.src = LogoUrl;
 }catch(err){}
 //here LogoUrl = thumbnail image url
 
 
 //if logo is not displaying on channel detail section
 //then display the channel logo
 if(setted == false){
  channelProfile.src = LogoUrl;
 }
 //now logo is displaying
 //that's why it is true
 setted = true;

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
    //storing logo url to video_data object;
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    
    //getting logo from video_data obj
    let logo = video_data.channelThumbnail;
    //calling appendLogo
    //arguments = logo-url and channelId + thumbnail url
    //here 'remove' is thumbnail url
    appendLogo(logo, id+remove);
  })//.then(data =>{
 }//fetchLogo func (const fetchLogo = (chId))
 //calling fetchLogo function
 fetchLogo(id);
}//function startFetchingLogo
//--------------------------------------





//----handling subscribe btn----//
function subscribedOrNot(){
 if(localStorage.getItem(`${dataOfVidPage.videoId}subscribeData`) == "subscribed"){
  subscribeBox.style.background = "#494949";
  subscribePara.innerText = "subscribed";
 }
 else{
  subscribeBox.style.background = "#b02c2c";
  subscribePara.innerText = "subscribe";
 }
}//function subscribedOrNot
subscribedOrNot();


//if you click on subscribe button
subscribePara.addEventListener('click', ()=>{
 localStorage.setItem(`${dataOfVidPage.videoId}subscribeData`, "subscribed"); 
 
 //if video is subscribe then unsubscribe it
 if(subscribePara.innerText == "subscribed"){
  localStorage.removeItem(`${dataOfVidPage.videoId}subscribeData`);
 }//if condition
 subscribedOrNot();
})//event listener on subscribe para 





//--appending videos of channel--//
function appendVideos(data){
 //making video box for all objects inside data(responced data)
 data.forEach(({snippet, id:{videoId}})=>{
  //video box for event listener
  let div = document.createElement('div');
  div.classList.add('video-box')
  
  //if channel name of video is = channelName at channel detail section
  if(snippet.channelTitle == channelName){
  //inner html for video box
  div.innerHTML = `
  <!--thumbnail image container-->
  <div class="image-con">
   <img src="${snippet.thumbnails.high.url}"/>
  </div>
  
 <!--bottom section-->
 <div class="bottom-con">
  <!--channel logo container-->
  <div class="channel-image-con">
   <img src="" class="logo-img-tag" id="${snippet.channelId}${snippet.thumbnails.high.url}"/>
  </div>
  
  <!--paragraphs container-->
  <div class="para-con">
   <!--video title-->
   <span class="title">
    ${snippet.title} 
   </span>
   
   <!--channel-name, views, upload-time con-->
    <span class="channel-name-views-con">
     <!-- wrapper -->
     <div class="wrapper">
       ${snippet.channelTitle} • 300k vews • 1 year ago
     </div>
    </span>
  </div>
  </div>
  `;
  container.append(div)
  }//if condition
  
  //calling startFetchingLogo
  //arguments = channelId and Thumbnail url
  startFetchingLogo(snippet.channelId, snippet.thumbnails.high.url);
  
  
  //this data will help to play the video, when you click to play the video
  let data ={
   snippet,
   videoId,
  }
  
  
  div.addEventListener('click', ()=>{
  localStorage.setItem("video", JSON.stringify(data))
 
  //--------------------------------------
  //making history feature
  //--------------------------------------
  //if history array us not present in local storage then set tha history array to localStorage
  if(localStorage.getItem("history") === null){
   let historyrr = [];
   let stringHistoryarr  = JSON.stringify(historyrr);
   localStorage.setItem("history", stringHistoryarr);
   }//if condition
    
  //pushing videos to history array for history feature
  //getting history arr from localStorage
  let historyArr = JSON.parse(localStorage.getItem("history"));
  //this is obj or clicked video
  let obj = data;
  //I dont know
  let localData = localStorage.getItem(data. snippet.thumbnails.high.url);
  
  //if  clicked video is not already on history then push it to history array
  if(localData != "saved"){
    historyArr.push(obj);
  }
  
  
  let dataSaved = data.snippet.thumbnails.high.url;
  //this will tell that video is in history array
  localStorage.setItem(dataSaved, "saved")
  //now stringify the history arr
  let strHisArr = JSON.stringify(historyArr);
  //save the stringified arr to localStorage
  localStorage.setItem("history", strHisArr);
  
  
  //redirecting to video page
   window.location.href="video.html"
  });// div.addEventListener
 })//forEach
}//function appendVideos






//----fetching playlist----//
async function fetchPlaylist(){
 //fetching playlist data
 let res = await fetch(playlist_http); 
 let playlists = await res.json();
 
 
 //forEach on playlist data
 playlists.items.forEach((item)=>{
  //video box for event listener
  let div = document.createElement('div');
  div.classList.add('video-box')
  
  //getting published date
  let text = item.snippet.publishedAt;
  //console.log(text);
  let expression = /T........./g;
  text = text.replace(expression, '');
  
  //logo of channel (url)
  let logoData = JSON.parse(localStorage.getItem("logoData"))
  
  //inner html for video box
  div.innerHTML = `
  <!--thumbnail image container-->
  <div class="image-con">
   <img src="${item.snippet.thumbnails.high.url}" class="thumbnail"/>
   <span class="playlistNumCon">
     ${item.contentDetails.itemCount} Videos
   </span>
  </div>
  
 <!--bottom section-->
 <div class="bottom-con">
  <!--channel logo container-->
  <div class="channel-image-con">
   <img src="${logoData}" class="logo-img-tag" id="${item.snippet.channelId}${item.snippet.thumbnails.high.url}"/>
  </div>
  
  <!--paragraphs container-->
  <div class="para-con">
   <!--video title-->
   <span class="title">
    ${item.snippet.localized.title} 
   </span>
   
   <!--channel-name, views, upload-time con-->
   <span class="channel-name-views-con">
     <!-- wrapper -->
     <div class="wrapper">
       ${item.snippet.channelTitle} • 300k • ${text}
     </div>
   </span>
  </div>
  </div>
  `;
  container.append(div)
  
  
  
  //---if you click on playlist item
  div.addEventListener('click', ()=>{
   //datas for playlist page 
   // thumbnail image */
   let thumbnail = item.snippet.thumbnails.high.url;
   // title of playlist 
   let title = item.snippet.localized.title;
   // name of channel
   let channelName = item.snippet.channelTitle;
   // num of videos in playlist
   let VideoCount = item.contentDetails.itemCount;
   //upload Time
   let uploadTime = text;
   //logo image
   let logoImg = logoData;
   //playlistId
   let playlistId = item.id;
   //console.log(playlistId)
   
   //preparing object or data fir playlist page
   let playlistObj = {
    thumbnail: thumbnail,
    title: title,
    channelName: channelName,
    VideoCount: VideoCount,
    uploadTime: uploadTime,
    channelLogo: logoImg,
    playlistId: playlistId,
   }
   console.log(JSON.stringify(playlistObj))
   //finnaly storing that prepared data obj fir playlist page
   localStorage.setItem('playListData', JSON.stringify(playlistObj));
   
   //redirecting toplaylist page
   location.href = 'playlist.html'
  });//eventListener on playlist box
 });//for each on playlists.items
}//function fetchPlaylist
