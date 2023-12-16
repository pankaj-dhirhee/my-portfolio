//api key
let  api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";

//used to fetch channel logo
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

//image tag or channel logo
let channelLogo = document.querySelectorAll('.logo-img-tag');

//here video box will append
let container = document.getElementById('videos-container');
 
//it will true when you click on any video box
let clicked = false;
 
//it contains all data 
let allData = [];
//---------------------------------------




//----fetching all the required datas----//
async function homeVideos(){
try{
 //contains logo url
 let logoData;
 //contains data of video
 let vidData;
 

 //----part1 fetching videos data
 let res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=storyes in hindi&key=${api}`);
 let data = await res.json();
 vidData = data;


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
  //console.log(JSON.stringify(logos))
  
  
  
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
  
  
  
  //--part3 filtering views
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
 };//if condition
 });//forEach on items or videoData 
 setTimeout(()=>{
   appendVideos()
 }, 3000)
}//try
catch(err){
  setTimeout(()=>{
    //this function will load videos
    homeVideos()
  }, 4000)
}
};//function homeVideos
homeVideos();
 
 
 
 
 
//----appending videos----//
function appendVideos(){
 
 //for each on allData
 allData.forEach((obj)=>{
 
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
  container.append(div)
  console.log(JSON.stringify(div.innerHTML))
 
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
   window.location.href="html/video.html"
  });//div par event listener
 })//forEach
}//function appendVideos
