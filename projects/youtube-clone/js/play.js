//it will get clicked video data from local storage
let data = JSON.parse(localStorage.getItem('video'));

//it contains all data 
let allData = [];

//it is same 'allData'
//sended when you clicked on video
//it contains all the data that is required
let viewsData = JSON.parse(localStorage.getItem("itemOfAllData"));

//api key
let api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";

//container for iframe
let container = document.getElementById('iframe-container');

//here title or video will display
let titlep = document.getElementById("title");

//like image tag
let likeBtn = document.getElementById('like');

//dislike image tag
let dislikeBtn = document.getElementById('dislike');

let subscribeBox = document.getElementById("subscribe-box");

let subscribePara = subscribeBox.querySelector("span");

let channelNamePara = document.getElementById("channel-name-para");

let dummyCommentBox = document.getElementById("comment-box");

let normalContainer = document.getElementById("normal-content-container");

let mainCommentContainer = document.getElementById("comment-ka-main-container");

let cutBtnOfComment = document.getElementById("cut");

let channelLogo = document.getElementById('image-tag-logo');

//used to fetch channel logo
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

//place where comment boxes will append
let commentCon = document.querySelectorAll('.container-of-boxes-of-comment')

//here suggested videos will appear
let suggestionVideosContainer = document.getElementById('videos-container');

let iframe = document.getElementById('iframe');
 
//para for title or video
let titleP = document.getElementById('title');

//here likes number will ne displayed
let likeNumSpan = document.getElementById('likeSpan');

//here  comments number will ne displayed
let commentsNumSpan = document.querySelectorAll('.commentNumber');

//here views will display 
let viesSpanOfIframeSec = document.getElementById('viewsSpan');

//here upload time  will display 
let uploadSpanOfIframeSec = document.getElementById('uploadTimeSpan');
//---------------------------------------







//----handling all buttons----//
//this function will check whether the video is liked or disliked
function checkVideoLikedOrDisliked(){
if(localStorage.getItem(data.videoId) == 'liked'){
 likeBtn.src = '../assets/liked-btn.png';
}
else{
 likeBtn.src = '../assets/like-btn.png';
}
//----------------------------------------

if (localStorage.getItem(data.videoId) == 'disliked'){
 dislikeBtn.src = '../assets/liked-btn.png';
}
else{
 dislikeBtn.src = '../assets/like-btn.png';
}
}//function checkVideoLikedOrDisliked()
checkVideoLikedOrDisliked()
//---------------------------------------


//part1 handling like btn
//when you click on like button
likeBtn.addEventListener('click', ()=>{
  
 //if disliked then undislike the video
 if(localStorage.getItem(data.videoId) == "liked"){
  localStorage.removeItem(data.videoId)
 }
 else{
 localStorage.setItem(data.videoId, "liked")
 }
 checkVideoLikedOrDisliked()
});//event listener on like btn
//---------------------------------------


//part2 handling dislike btn
//when you click on dislike button
dislikeBtn.addEventListener('click', ()=>{

//if disliked then undislike the video
 if(localStorage.getItem(data.videoId) == "disliked"){
  localStorage.removeItem(data.videoId)
 }
 else{
 localStorage.setItem(data.videoId, "disliked")
 }
 checkVideoLikedOrDisliked()
});//event listener on dislike btn
//---------------------------------------


//'video is subscribed or not' function
function subscribedOrNot(){
 
 if(localStorage.getItem(`${data.videoId}subscribeData`) == "subscribed"){
  subscribeBox.style.background = "#494949";
  subscribePara.innerText = "subscribed";
 }
 else{
  subscribeBox.style.background = "#b02c2c";
  subscribePara.innerText = "subscribe";
 }
 
}//function subscribedOrNot
subscribedOrNot();


//part3 handling subscribe btn
//if you click on subscribe btn then...
subscribePara.addEventListener('click', ()=>{
 localStorage.setItem(`${data.videoId}subscribeData`, "subscribed"); 
 
 //if video is subscribe then unsubscribe it
 if(subscribePara.innerText == "subscribed"){
  localStorage.removeItem(`${data.videoId}subscribeData`);
 }//if condition
 subscribedOrNot();
})//event listener on subscribe para


//part4 displaying likes number
likeNumSpan.innerText = viewsData.likes;
//-------------------------------------





//----channel detail section----//
//part1 click on channel detail & go to channel page and see all videos or channel
channelNamePara.addEventListener("click", ()=>{
 location.href="channel-preview.html"
});//event listener on channelNamePara


//part2 displaying channel name
channelNamePara.innerText = data.snippet.channelTitle;


//part3 displaing channel logo--
//gettiing channel logo
let logoUrl = JSON.parse(localStorage.getItem('logoData'));
channelLogo.src = logoUrl;
//-------------------------------------





//----handling iframe section----//
//this will play the video and display video title
function playVideo(data){
iframe.src=`https://www.youtube.com/embed/${data.videoId}`;

 container.append(iframe);
 
 //if video title is ready then display it
 if(data.snippet.channelTitle){
 titlep.innerText = data.snippet.title;
 }
};//function playVideo
playVideo(data);


//displaying views
viesSpanOfIframeSec.innerText = viewsData.views;

//displaying upload time
uploadSpanOfIframeSec.innerText = `• ${viewsData.publishedAt}`;
//-------------------------------------





//----fetching the suggested video----//
async function homeVideos(){
try{
 //contains logo url
 let logoData;
 //contains data of video
 let vidData;
 

 //----part1 fetching videos data
 //this is value of search input or search page
 let query = localStorage.getItem("suggest");
 
 //fetching data according to query
 let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${query}&key=${api}`);
 
 let data = await res.json();
 vidData = await data;


 //----fetching some data for each video data
 data.items.forEach(async (item)=>{
 
  //contains num of views, likes, comment
  let viewsData;
 
 
  //if data contains videoId then only..
  if(item.id.videoId != 'undefined'){
  
  //----part2 fetching view, likes num of comment
  let views = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${item.id.videoId}&key=${api}`);
  
  let statics = await views.json();
  viewsData = statics;
 
 
 
  //----part3 fetching channelLogo
  let logoFetched = await fetch(channel_http + new URLSearchParams({
    key: api,
    part: 'snippet,statistics',
    id: item.snippet.channelId,
    maxResults: 1,
  }));

  let logos = await logoFetched.json();
  logoData = logos; 
  
 
 
  //--values that need to filter
  //--part1 filtering upload time
  let uploadDate = await viewsData.items[0].snippet.publishedAt;
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
  
  //get days in year function 
  function getDaysInMonth(year, month){
   return new Date(year, month, 0).getDate()
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
  
  
  //--part2 filtering subscribers
  //converting subscribers(1000) to 1k
  //coverting subscribers inti 'K' 'M' etc 
  let subscribers = logoData.items[0].statistics.subscriberCount;
  //converting subscribers into integer
  let subscribersValue = parseInt(subscribers)
  //value formating function
  //like 1000 to '1k(thusand)'
  let f = new Intl.NumberFormat(undefined, {
   notation: "compact",
  });
  //fomating value
  subscribers = f.format(subscribersValue);
  
  
  //--part3 filtering video duration
  let vidDuration = viewsData.items[0].contentDetails.duration;
  //replacing useless characters to ':'
  vidDuration = vidDuration.replace('PT', '');
  vidDuration = vidDuration.replace('M', ':');
  vidDuration = vidDuration.replace('S', '');
  vidDuration = vidDuration.replace('H', ':');
  
  //converting 'returned duration' into array
  let arr = Array.from(vidDuration)
  //value of last index or array
  let lastPosition = arr[arr.length-1]
  //last index num of array
  let positionOne = arr.length - 1;
  //second last index num of arr
  let positionTwo = arr.length - 2;
  //character at last index of array
  let valOne = arr[positionOne];
  //character at second last index of array
  let valTwo = arr[positionTwo];
  
  //1. => if '11:5' then convert to '11:05'
  if (valTwo == ":"){
   //now duration = 11:5
   //shifting the value at last index to one step front
   arr[positionOne+1] = arr[positionOne]
   //by above line now duration => 11:55
   //in the place of shifted value => '0'
   arr[positionOne] = "0";
   //by above line now duration => 11:05
   
   //two posiblities...
   //first is '1:5' & second is '11:5'
   //now it is for second posiblity
   //now duration arr is => 11:05
   if (arr.length == 5){
    vidDuration = `${arr[0]}${arr[1]}${arr[2]}${arr[3]}${arr[4]}`
   }
   //now duration arr is => 1:05
   else{
    vidDuration = `${arr[0]}${arr[1]}${arr[2]}${arr[3]}`
   }
  }
  //above if else is to avoid error
  
  
  //2. => if '1:' then convert to '1:00'
  if(lastPosition == ':' && arr.length == 2){
    vidDuration = `${arr[0]}${arr[1]}00`    
  }
  //if '11:' then '11:00'
  else if(lastPosition == ':' && arr.length == 3){
    vidDuration = `${arr[0]}${arr[1]}${arr[2]}00`
  }
  else{}
  
  
  
  //--part4 filtering views
  //converting view(1000) to 1k
  //coverting views inti 'K' 'M' etc 
  let viewValue = parseInt(viewsData.items[0].statistics.viewCount);
  //value formating function
  //like 1000 to '1k(thusand)'
  let f2 = new Intl.NumberFormat(undefined, {
   notation: "compact",
  });
  viewValue = f2.format(viewValue); 
  
  
  
  //--part4 filtering likes
  let likesValue = parseInt(viewsData.items[0].statistics.likeCount);
  //value formating function
  //like 1000 to '1k(thusand)'
  let f3 = new Intl.NumberFormat(undefined, {
   notation: "compact",
  });
  likesValue = f3.format(likesValue); 
  //-----------------------
  
 
   
  //----part5 storing required data to allData
  //preparing required data
  let videoId = item.id.videoId;
  let channelId = item.snippet.channelId;
  let title = item.snippet.title;
  let channelTitle = item.snippet.channelTitle;
  let channelLogo = logoData.items[0].snippet.thumbnails.default.url;
  let viewsCount = viewValue;
  let likes = likesValue;
  let comments = viewsData.items[0].statistics.commentCount;
  let publishedAt = uploadDate;
  let description = viewsData.items[0].snippet.description;
  let thumbnail = item.snippet.thumbnails.high.url;
  let snippet = item.snippet;
  let subscriberNum = subscribers;
  let totalVideosOfChannel = logoData.items[0].statistics.videoCount;
  let channelDescription = logoData.items[0].statistics.description;
  
  
  //making object or required data
  let obj = {
    videoId: videoId,
    channelId: channelId,
    title: title,
    channelTitle: channelTitle,
    channelLogo: channelLogo,
    views: viewsCount,
    likes: likes,
    comments: comments,
    publishedAt: publishedAt,
    description: description,
    thumbnail: thumbnail,
    snippet: snippet,
    videoDuration: vidDuration,
    channelDescription: channelDescription,
    totalVideosOfChannel: totalVideosOfChannel,
    subscribers: subscriberNum,
  }
  //pushing required data obj to allData
  allData.push(obj);
  
  //calling append function
  appendVideos(obj)
 };//if condition
 });//forEach on items or videoData 
}//try
catch(err){
  setTimeout(()=>{
    //this function will load videos
    homeVideos()
    //this will display video on iframe
    playVideo(data)
  }, 4000)
}
 }
 homeVideos();
 

 
 
 
 

//----appending videos----//
function appendVideos(obj){
 //video box for event listener
 let div = document.createElement('div');
 div.classList.add('video-box')
   
   
 //inner html for video box
 div.innerHTML = `
 <!--thumbnail image container-->
 <div class="image-con">
  <img src="${obj.thumbnail}"/>
  <span class="videoDurationSpan">
   ${obj.videoDuration}
  </span>
 </div>
  
 <!--bottom section-->
  <div class="bottom-con">
   <!--channel logo container-->
   <div class="channel-image-con">
    <img src="${obj.channelLogo}" class="logo-img-tag" id="${obj.channelId}${obj.thumbnail}"/>
   </div>
  
   <!--paragraphs container-->
   <div class="para-con">
    <!--video title-->
    <span class="title">
      ${obj.title} 
    </span>
   
    <!--channel-name, views, upload-time con-->
    <span class="channel-name-views-con">
     <!-- wrapper -->
     <div class="wrapper">
        ${obj.channelTitle} • ${obj.views} • ${obj.publishedAt}
     </div>
    </span>
   </div>
  </div>
  `;
  suggestionVideosContainer.append(div)
   
 
  //this data will help to play the video
  let snippet = obj.snippet;
  let videoId = obj.videoId;
  let data ={
   snippet: snippet,
   videoId: videoId,
  }
  //object for videoPlay page
  let requiredObject = obj;
  
  
  //when you click on video box then...
  div.addEventListener('click', ()=>{
   //storing item of all data for video play page
   localStorage.setItem('itemOfAllData', JSON.stringify(requiredObject))
  
  
   //----storing logo for video page----
   let logo = div.querySelector('.logo-img-tag').src;
   //stringifying the logo url
   let logoStr = JSON.stringify(logo);
   //storing channel logo url
   //used to display channel logo in video page
   localStorage.setItem('logoData', logoStr);
  
  
    
   //this is will work as suggest videos query
   let query = localStorage.setItem("suggest", JSON.stringify(data.snippet.channelId));
   
   //storing the data of clicked video to local storage 
   //used to add in watch history
   localStorage.setItem("video", JSON.stringify(data));   
   //--------------------------------------   
     
     
   //----making history feature----//
   //if history array is not present in local storage then set history array to localStorage
   if(localStorage.getItem("history") === null){
    let historyrr = [];
    let stringHistoryarr  = JSON.stringify(historyrr);
    localStorage.setItem("history", stringHistoryarr);
   }//if condition
    
    
   //pushing videos to history array for history feature
   //getting history arr from localStorage
   let historyArr = JSON.parse(localStorage.getItem("history"));
   //this is obj of clicked video
   let obj = data;
   //I dont know
   let str = JSON.stringify(data.snippet.thumbnails.high.url);
   let localData = localStorage.getItem(str);
  
 
   //if  clicked video is not already in history then push it to history array
   if(localData != "saved"){
     historyArr.push(obj);
   }//if statement
  
  
   //it will tell that this video is now in history
   let dataSaved = JSON.stringify(data. snippet.thumbnails.high.url);
  
  
   //this will tell that video is in history array
   //and dont push this video In history again
   localStorage.setItem(`${dataSaved}`, 'saved')
   //now stringify the history arr
   let strHisArr = JSON.stringify(historyArr);
   //save the stringified arr to localStorage
   localStorage.setItem("history", strHisArr);
  
   //redirecting to video page
   window.location.href="video.html"
  });//div par event listener

}//function appendVideos
//--------------------------------------





//----comments section----//
//displaying comment count or number
//there are two comment num span so that forEach loop
Array.from(commentsNumSpan).forEach((element)=>{
  element.innerText = `Comments ${viewsData.comments}`;
})

//displaing all comments when you click on dummy comment box
dummyCommentBox.addEventListener('click', ()=>{
 normalContainer.style.display = "none";
 mainCommentContainer.style.display = "block";
});

//hiding comment section when you click on cut button
cutBtnOfComment.addEventListener('click', ()=>{ 
 mainCommentContainer.style.display = "none";
 normalContainer.style.display = "block"; 
});


//fetching comments data
async function fetchComment(){
 console.log('caller func')
 try{
   let res = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${viewsData.videoId}&maxResults=10&key=${api}`);
 
   let commentData = await res.json(); 
   appendComments(commentData);
 }
 catch(err){
   setTimeout(()=>{
     //this function will load comments
     fetchComment()
   }, 4000)
 }
}
fetchComment();


//appending comments
function appendComments(dataOfComment){
 //for on dataOfComment
 dataOfComment.items.forEach((item)=>{
  
  let div = document.createElement('div');
  div.classList.add('comment-box');
  
  //making proper comment box
  div.innerHTML += `    
   <div class="img-container">
     <img src="${item.snippet.topLevelComment.snippet.authorProfileImageUrl}" />
    </div>
    
    <span>
     <p class="commenter-name">
      @${item.snippet.topLevelComment.snippet.authorDisplayName}
     </p>
     
     <!-- paragraph of comment -->
     <p class="paragraph-of-comment">
       ${item.snippet.topLevelComment.snippet.textOriginal}
     </p>
    </span>
  `;
  
  //we have to append comment box in mobile and pc coment.
  //so that forEach loop
   Array.from(commentCon).forEach((element)=>{
     element.append(div);
     element.innerHTML += '<hr>';
   });
  
 });//for each on dataOfComment
}//append function for comments
//--------------------------------------
