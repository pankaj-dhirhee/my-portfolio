//-------variables-------
//playlistData from channelPreview page
let playlistData = JSON.parse(localStorage.getItem('playListData'));

//api key
let api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";

//channel name on the navbar
let channelNameOnNav = document.getElementById('channel-name-on-nav');

//Image tag to display thumbnail
let thumbnailImg = document.getElementById('playlist-thumbnail-img');

//span to display playlist title
let title = document.getElementById('playlist-title');

//span to display channelName on top section
let channelName = document.getElementById('playlist-channel-name');

//span to display num of videos in playlist
let videoCount = document.getElementById('playlist-vid-count');

//span to display upload time
let uploadTime = document.getElementById('playlist-upload-time');

//container to append video boxes
let vidBoxesCon = document.getElementById('videos-container');
//=====================================





//------handling top section------
//displaying channel name on navbar
channelNameOnNav.innerText = playlistData.channelName;

//displaying thumbnail image on top sec
thumbnailImg.src = playlistData.thumbnail;

//displaying title of playlist
title.innerText = playlistData.title;

//displaying channelName
channelName.innerText = playlistData.channelName;

//displaying number or videos in playlist
videoCount.innerText = playlistData.VideoCount + '\bVideos';

//thisplaying upload time
uploadTime.innerText = 'Updated on \b' + playlistData.uploadTime;
//=====================================





//------fetching and displaying videos-----
//---part1 Fetching videos
async function fetchPlaylistVideoaAndDisplay(){
try{
 let res = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistData.playlistId}&key=${api}`);
 
 let data = await res.json()
 
 //calling makeVideoBoxAndDisplay function 
 await makeVideoBoxAndDisplay(data);
}//try
catch(err){
   setTimeout(()=>{
     //this function will load videos
     fetchPlaylistVideoaAndDisplay()
   }, 4000)
 }
}//function fetchPlaylistVideoaAndDisplay
//calling this function
fetchPlaylistVideoaAndDisplay();


//---part2 making video box and displaying
function makeVideoBoxAndDisplay(vidData){
 //forEach on vidData
 vidData.items.forEach((item)=>{
  //video box for event listener
  let div = document.createElement('div');
  div.classList.add('video-box')
  
    
  //----filtering upload time----//
  let uploadDate = item.snippet.publishedAt;
  uploadDate = uploadDate;
  //removing this => 'T1:30:20'
  const regular = /T........./g
  uploadDate = uploadDate.replace(regular, '')
  
  //----converting in day, months----//
  let a = uploadDate;
  //separating by (-) symbol
  a = a.split("-")
  //given days
  let d1 = parseInt(a[2]);
  //given month
  let m1 = `0${parseInt(a[1])}`;
  //given year
  let y1 = parseInt(a[0]);

  //getting today's date
  let today = new Date();
  let d2 = today.getDate();
  let m2 = today.getMonth() + 1;
  let y2 = today.getFullYear();

  //getting time difference
  let d3, m3, y3;  
  
  //get days in year function 
  function getDaysInMonth(year, month){
   return new Date(year, month, 0).getDate();
  }
  //getting month difference
  y3 = y2 - y1;
  //if today month is bigger than given month
  if(m2 >= m1){
    m3 = m2 - m1;
  }
  //if today month is smaller than given
  else{
  y3--;
  m3 = 12 + m2 - m1;
  }
  
  //getting days difference
  //if today date is bigger than given
  if(d2 >= d1){
    d3 = d2 - d1;
  }
  //if today date is smaller than given
  else{
    m3--;
    d3 = getDaysInMonth(y1, m1) + d2 - d1;
  }
  //if month difference is smaller than 0
  if(m3 < 0){
    m3 = 11;
    y3--;
  }
  
  
  //displaying only one difference
  //like => only in days, or only in year
  //if year difference = 0 and month difference is not 0 then display in 'months ago'
  if(y3 == 0 && m3 != 0){
   uploadDate = `${m3} months ago`
  }
  //if year difference is bigger than 0 & month difference is 0 then display in 'years ago'
  else{
   uploadDate = `${y3} years ago`
  };
  //if month and year difference is 0 then display in 'days ago'
  if(m3 == 0 &&  y3 == 0){
   uploadDate = `${d3} days ago`
  };
  //if day, month & year difference is 0 then just display 'Today'
  if(d3 == 0 && m3 == 0 && y3 == 0){
   uploadDate = `Uploaded Today`
  }
    
    
    
  //preparing video box
  div.innerHTML = `
  <!--thumbnail image container-->
  <div class="image-con">
   <img src="${item.snippet.thumbnails.high.url}"/>
  </div>
  
 <!--bottom section-->
 <div class="bottom-con">
  <!--channel logo container-->
  <div class="channel-image-con">
   <img src="${playlistData.channelLogo}" class="logo-img-tag" id="${item.snippet.channelId}${item.snippet.thumbnails.high.url}"/>
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
  </div>
  `;
  vidBoxesCon.append(div)
  
  
  //this data will help to play the video, when you click to play the video
  let snippet = item.snippet;
  let videoId = item.snippet.resourceId.videoId;
  let data ={
   snippet: snippet,
   videoId: videoId,
  }
  
  
  //event listener on div
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
  
  
  let dataSaved = data. snippet.thumbnails.high.url;
  //this will tell that video is in history array
  localStorage.setItem(dataSaved, "saved")
  //now stringify the history arr
  let strHisArr = JSON.stringify(historyArr);
  //save the stringified arr to localStorage
  localStorage.setItem("history", strHisArr);
  
  
  //redirecting to video page
  window.location.href="video.html";
  });// div.addEventListener
 });//forEach on vidData
}//function makeVideoBoxAndDisplay
