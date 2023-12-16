//== Variables ==//
//song index
let songIndex = 1;

//main container of first sec
let mainContainerOfFirstSec = document.getElementById("main-container-of-page");

//source for cover image
let coverImage = "../images/music.png";

//source for play button
let pausedBtnSource = "../images/play-btn.png";

//source for playing btn image
let playingBtnSource = "../images/pause.png"

//songs array
let songArr = JSON.parse(localStorage.getItem('favouriteSongsArray'));

//max number of songs
let maxSong;

//audio element
let audioElement = new Audio();
try{
  let sourceOfFirstObjectOfSongArray = songArr[0].source;
  audioElement.src = sourceOfFirstObjectOfSongArray;
} 
catch(err){};

//sp section controll pannel play button
let controllPanelPlayBtn = document.querySelectorAll(".play-btn");

//sp section's controll panel previous button
let controllPanelPreviousBtn = document.getElementById("previous");

//sp section ka controll pannel next button
let controllPanelNextBtn = document.querySelectorAll(".next");

//controll panel ka song name para
let SongNameInSmallModal = document.querySelector('.modal-music-song-name');

//sp-music-ka-main-container
let spMusicKaMainContainer = document.getElementById('sp-music-ka-main-container');

//sp music ka posture ka song name
pSongName = document.getElementById('sp-song-name');

//sp section ka posture container
spPostureC = document.getElementById('music-posture-container');

//sp section navbar for back
let spNav = document.getElementById('sp-nav-for-back')

//sp music ke controll panel ka song name
let spCSongName = document.querySelectorAll('.sp-music-song-name');

//sp section ka seekbar container
let seekbarC = document.getElementById('seekbar-container');

//sp section ka controll panel container
let spControllC = document.getElementById('sp-controll-panel-container');

//back button of sp section ka navbar
let spBack = document.getElementById('back-btn');

//seekbar or controll panel
let seekbar = document.getElementById('seekbar')

//sp section ka final duration span
let finalDurationSpan = document.getElementById('final-duration');

//progress duration span of sp section
let progressSpan = document.getElementById('progress-duration');

////if it will false then we will not play DownAnimation on click of browser back button
let shouldWeCallDownAnimationFunction = false;

//if it will false then we will not call ToggleClassHide function on click of brouser back button
let shouldWeCallToggleClassHideFunction = false;

//box, contain input tag and search image
let searchBox = document.getElementById('search-box');

//input tag for search of search sec
let inp = document.getElementById('myInput');

//container of suggestion search boxes
let suggestionBoxCon = document.getElementById('suggested-search-container');

//main container of sp section
let spMainCon = document.getElementById('sp-music-ka-main-container')

//search button on navbar
let searchBtnOnNavbar = document.getElementById('search');

//container or first sec 
let containerOfFirstSec = document.getElementById('main-container-of-page');

//main container of search page
let mainContainerOfSearchPage = document.getElementById('search-ka-main-container');

//screen will show when there is not any song
let screen_for_no_song = document.querySelector('.screen-for-no-song');

//container of all music boxes
let containerOfMusicBox = document.querySelector('.music-boxes-container');

//small music modal
let smallMusicModal = document.querySelector('.music-player-small-modal');
//=============================================//




//---------------------------------------------//
//           DISPLAYING THE SONGS              //
//---------------------------------------------//
//-- Id generator function --//
let initialId = 0;
function idGenerator(){
  initialId = initialId + 1;
  //max song
  maxSong = initialId;
  return initialId;
}



//-- SHOW SCREEN FOR NO SONG --//
function show_screen_for_no_song(){
  spMainCon.style.display = 'none';
  containerOfMusicBox.style.display = 'none';
  screen_for_no_song.style.display = 'flex';
  //hiding small music playervmodal bat bottom
  smallMusicModal.style.display = 'none';
}



//== IF THERE IS NO SONG THEN CALL show_screen_for_no_song ==//
//here, catch method will call show_screen_for_no_song function
try{
  let songName = songArr[0].name
}
catch(err){
  show_screen_for_no_song()
}



//-- generating html for all obj in music arr --//
 try{
   songArr.forEach((obj)=>{ 
      let idInNum = idGenerator();
      let idForSongNamePara = `p${idInNum}`
      containerOfMusicBox.innerHTML += `
        <div class="music-box">
           <!-- Left side -->
           <div class="left">
              <img src="${coverImage}" class="cover"/>
              <p class="music-name ${idForSongNamePara}">
                ${obj.name}
              </p>
           </div>
        
           <!-- Right side -->
           <div class="right">
              <button>
                <img src="${pausedBtnSource}" class="play-img" id="${idInNum}"/>
              </button>
           </div>
        </div>
     `
   })//for each loop on songArr
 }
 catch(err){
   //it will show screen for no song
   console.log('hh')
   show_screen_for_no_song()
 }
//=============================================//




//---------------------------------------------//
//  HANDLE CLICK OF PLAY BUTTON IN MUSIC BOX   //
//---------------------------------------------//
// All play buttons inside music box
let musicBoxPlayBtn = document.querySelectorAll(".play-img")

//---- Adding event listener on play buttons ----//
musicBoxPlayBtn.forEach((item)=>{
 item.addEventListener('click', (e)=>{
    //If audioElement is paused then play the song
    if (audioElement.paused && audioElement.currentTime == 0){
        //getting id of music box play btn
        songIndex = parseInt(e.target.id);
      
        //setting src of audio element
        audioElement.src = `../songs/${songIndex}.mp3`;
         
        //Changing c-panel button to pause btn
        Array.from(controllPanelPlayBtn).forEach((img)=>{
          img.src = playingBtnSource;
        });
   

        //Playing the audio element
        audioElement.play();  
        //Changing music box button to pause btn
        item.src = playingBtnSource;
   
        //Displaying song name on controll panel
        //1- pahle songIndex ka value lo.
        //2- then add '.p' in front of value.
        //3- then value will be .p1, .p2, .p3 etc
        //4- find the class that is = this value
        //5- then innerHTML of controllPanelsong 
        //name will = value ke nam ka classname ka innerText
        SongNameInSmallModal.innerText = document.querySelector(`.p${songIndex}`).innerText;
   
        //displaying song name posture song name
        pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
    }//if condition

   
    //else, if item ka id = songIndex then pause the song.
    else if (parseInt(item.id) == songIndex){
        //pausing the audio
        if (audioElement.paused) {
           //changing the image of music box play btn
           item.src = playingBtnSource;

           //changing the image of c-panel play btn
           Array.from(controllPanelPlayBtn).forEach((img)=>{
             img.src = playingBtnSource;
           });
   
           songIndex = parseInt(e.target.id);
           songIndex = parseInt(e.target.id);
           audioElement.play();
        }// if (audioElement != paused)
        //else, means if audio is paused then...
        else{
           //changing the image of music box play btn 
           item.src = pausedBtnSource;
  
           //changing the image of c-panel play btn
           Array.from(controllPanelPlayBtn).forEach((img)=>{
             img.src = pausedBtnSource;
           });
           audioElement.pause();
        }
  
        //changing the image of music box play btn
        // item.src = '/images/play-btn.png';
   
        //getting id of music box play btn
        songIndex = parseInt(e.target.id);
    }//else if
  
  
    //if item ka play btn ka id is not = songIndex then play the next song
    if (parseInt(item.id) != songIndex) {
        //getting id of music box play btn
        document.getElementById(songIndex).src = pausedBtnSource
        songIndex = parseInt(e.target.id);
        //setting src or audio element
        audioElement.src = `../songs/${songIndex}.mp3`;
        //reseting audio ka currentTIME = 0
        audioElement.currentTime = 0;
        
        //Changing c-panel button to pause btn
        Array.from(controllPanelPlayBtn).forEach((img)=>{
          img.src = playingBtnSource;
        });

       //playing the audio element
       audioElement.play();
       //Changing music box button to pause btn
       item.src = playingBtnSource;
   
       //displaying song name on controll panel
       //1- pahle songIndex ka value lo.
       //2- then add '.p' in front of value.
       //3- then value will be .p1, .p2, .p3 etc
       //4- find the class that is = this value
       //5- then innerHTML of controllPanelsong 
       //name will = value ke nam ka classname
       //ka innerText
       SongNameInSmallModal.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
   
       //displaying song name posture song name
       pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
    }//if (parseInt(item.id) != songIndex)
 });//event listener
});//forEach on musicBoxPlayBtn
//=============================================//




//---------------------------------------------//
//  SP PAGE & SMALL MODAL PLAY BUTTON CLICK    //
//---------------------------------------------//
//event listener on play button of small modal & sp page
Array.from(controllPanelPlayBtn).forEach((btns)=>{
 btns.addEventListener('click', ()=>{
    //if song is paused then play the song
    if (audioElement.paused || audioElement.currentTime <= 0){
       audioElement.play();
       Array.from(controllPanelPlayBtn).forEach((playBtns)=>{
         playBtns.src = playingBtnSource;
       });
       document.getElementById(songIndex).src = playingBtnSource;
    }
    //else, if song is paused then play the song
    else{
       audioElement.pause();
       Array.from(controllPanelPlayBtn).forEach((playBtns)=>{
         playBtns.src = pausedBtnSource;
       });
       //agar koi gana play ho raha hai aur mai controll panel ka play button me click karu then songIndex ke value ke nam ka id ko find karke uska src ko play button me badal do
       document.getElementById(songIndex).src = pausedBtnSource;
    }
 });//eventListener on controllPanelPlayBtn
});//forEach on controllPanelPlayBtn
//=============================================//




//---------------------------------------------//
//  HANDLING PREVIOUS BUTTON OF SP MUSIC SEC   //
//---------------------------------------------//
//event listener on previous button of sp music sec
controllPanelPreviousBtn.addEventListener('click', ()=>{
   //if songIndex is = zero(0) and we are clicking previous button then play the last song
   if (songIndex == 1){
      //previous pe kiya then pahle chal raha song ka image ka src ko play button bana do
      document.getElementById(songIndex).src = pausedBtnSource;
      songIndex = maxSong;
      //ab phir se incremented songIndex ke value ke nam ka id ka image ka src ko pause button me convert kar do. kyoki ab wo song play ho raha hoga
      document.getElementById(songIndex).src = playingBtnSource;
  
      //displaying song name on controll panel
      //1- pahle songIndex ka value lo.
      //2- then add '.p' in front of value.
      //3- then value will be .p1, .p2, .p3 etc
      //4- find the class that is = this value
      //5- then innerHTML of controllPanelsong 
      //name will = value ke nam ka classname
      //ka innerText     
      //displaying song name in posture 
      pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
   }//if (songIndex == 1)
   
   //else, means if the songIndex is not equals to zero then...
   else{
      //previous pe click kiya to pahle chal raha song ka image ka src ko play button bana do
      document.getElementById(songIndex).src = pausedBtnSource
      //ab song index decrement ho gaya kyoki hame previous song play karna hai kyoki previous pe click hua hai
      songIndex -= 1;
      //ab phir se decremented songIndex ke value ke nam ka id ka image ka src ko pause button me convert kar do. kyoki ab wo song play ho raha hoga
      document.getElementById(songIndex).src = playingBtnSource;
  
      //displaying song name on controll panel
      //1- pahle songIndex ka value lo.
      //2- then add '.p' in front of value.
      //3- then value will be .p1, .p2, .p3 etc    
      //4- find the class that is = this value
      //5- then innerHTML of controllPanelsong 
      //name will = value ke nam ka classname
      //ka innerText
      SongNameInSmallModal.innerHTML = document.querySelector(`.p${songIndex}`).innerText;  
   
      //displaying song name in posture 
      pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;  
   }//else
 
   //if songIndex is greater than maxSong the play first song
   if(songIndex > maxSong){
      songIndex = 1;
   }
   
   audioElement.src = `../songs/${songIndex}.mp3`;
   //reseting the current time of audio to zero(0)
   audioElement.currentTime = 0;
   //now play the audio
   audioElement.play();
   //converting the play button of controll panel into pause button
   Array.from(controllPanelPlayBtn).forEach((playBtn)=>{
     playBtn.src = playingBtnSource;;
   });
});//eventListener on controllPanelPreviousBtn
//=============================================//




//---------------------------------------------//
//  HANDLING NEXT BTN OF SP SEC & SMALL MODAL  //
//---------------------------------------------//
Array.from(controllPanelNextBtn).forEach((nextBtn)=>{
   //adding event listener to controll panel ka next button
   nextBtn.addEventListener('click', ()=>{
      if(songIndex <=0 ){
         songIndex = 0;
      }
      else{
         //next pe click kiya to pahle chal raha song ka ima ka src ko play button bana do
         document.getElementById(songIndex).src =pausedBtnSource
         //ab song index increment ho gaya
         songIndex += 1;
  
         //if the songIndex = 10 then reset the songIndex to one 
         if (songIndex > maxSong){
            songIndex = 1;
         }//if (songIndex == 10)
  
         //ab incremented songIndex ke value ke nam ka id ka image ka src ko pause button me convert kar do
         document.getElementById(songIndex).src =playingBtnSource;
  
         //displaying song name on controll panel
         //1- pahle songIndex ka value lo.
         //2- then add '.p' in front of value.
         //3- then value will be .p1, .p2, .p3 etc
         //4- find the class that is = this value
         //5- then innerHTML of controllPanelsong 
         //name will = value ke nam ka classname ka innerText
         SongNameInSmallModal.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
   
         //displaying song name in posture 
         pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;  
      }//else
 
      if(songIndex > maxSong){
         songIndex = 1;
      }
 
      audioElement.src = `../songs/${songIndex}.mp3`
      audioElement.currentTime = 0;
      audioElement.play();
      controllPanelPlayBtn.src = playingBtnSource;;  
   });
});//forEach on controllPanelNextBtn
//=============================================//





//---------------------------------------------//
//     UPDATING THE PROGRESS BAR DURATION      //
//---------------------------------------------//
//event listener on progress bar
try{
audioElement.addEventListener('timeupdate', (event)=>{
   let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
   seekbar.value = progress;
 

   //---- updating current duration indigator ----//
   //getting currentTime of audio
   let currentTime = audioElement.currentTime;
   //getting duration of audio
   let finalDuration = audioElement.duration;

   //finding the current minuteTime of audio
   let minuteCurrentTime = Math.floor(currentTime/60);
   //finding the current  seconds of audio
   let secondCurrentTime = Math.floor(currentTime % 60);

   //if minute time is less than zero(10) then add a zero(0) before minuteCurrentTime
   if(minuteCurrentTime < 10){
      minuteCurrentTime = `0${minuteCurrentTime}`
   }

   //if seconds time is less than zero(10) then add a zero(0) before secondCurrentTime
   if(secondCurrentTime < 10){
      secondCurrentTime = `0${secondCurrentTime}`
   }//if(secondCurrentTime < 10)

   //storing currentTime's final data 
   let totalCurrentTime = `${minuteCurrentTime}:${secondCurrentTime}`;

   //displaying the value of totalCurrentTime to  progress span tag
   progressSpan.textContent = totalCurrentTime;

   
   //---- Updating the final duration ----//
   {//block level scoping 
      //getting currentTime of audio
      let currentTime = audioElement.currentTime;
      //getting duration of audio
      let finalDuration = audioElement.duration;
      //finding the duration minuteTime of audio
      let minutefinalDuration = Math.floor(finalDuration / 60);
      //finding the duration seconds of audio
      let secondfinalDuration = Math.floor(finalDuration % 60);

      //if minute time is less than zero(10) then add a zero(0) before minutefinalDuration
      if(minutefinalDuration < 10){
         minutefinalDuration = `0${minutefinalDuration}`
      }

      //if seconds time is less than zero(10) then add a zero(0) before secondfinalDuration
      if(secondfinalDuration < 10){
         secondfinalDuration = `0${secondfinalDuration}`;
      }

      //storing finalTime's final data 
      let totalFinalTime = `${minutefinalDuration}:${secondfinalDuration}`;

      //it will solve the NAN problem
      //if the value of finalDuration is ready then only display it
      if(finalDuration){
         //displaying the value of totalCurrentTime to   duration span tag
         finalDurationSpan.textContent = totalFinalTime;
      }
   }//block level scoping
});//audioElement.addEventListener
}
catch(err){}
//=============================================//




//---------------------------------------------//
//   SEEKING AUDIO ACCORDING TO PROGRESS BAR   //
//---------------------------------------------//
//seekbar when swipe
seekbar.addEventListener('change', ()=>{
   audioElement.currentTime = seekbar.value * audioElement.duration / 100;
});
//=============================================//




//---------------------------------------------//
//  PLAYING NEXT SONG WHEN SONG WILL FINISHED  //
//---------------------------------------------//
//function that will automatically play the next song when the previous song finished
function isSongCompleated(){
   //if seekbar.value = 100 then add 1 to songIndex then play the next song
   if (seekbar.value === 100){
      //audio complete hua to pahle chal raha song ka image ka src ko play button bana do
      document.getElementById(songIndex).src = pausedBtnSource 
      //incrementing the songIndex
      songIndex += 1;

      //if the songIndex is bigger than last song then we are doing the songIndex = 1 to play the first song
      if(songIndex == 10){
         songIndex = 1;
      }
 
      //setting src of audioEpement
      audioElement.src = `../songs/${songIndex}.mp3`
      //reseting the value or seekbar to zero(0)
      seekbar.value = 0;
      //finally playing the audio
      audioElement.play();
      //ab incremented songIndex ke value ke nam ka id ka image ka src ko pause button me convert kar do
      document.getElementById(songIndex).src =playingBtnSource;
 
      //displaying song name on controll panel
      //1- pahle songIndex ka value lo.
      //2- then add '.p' in front of value.
      //3- then value will be .p1, .p2, .p3 etc
      //4- find the class that is = this value
      //5- then innerHTML of controllPanelsong 
      //name will = value ke nam ka classname
      //ka innerText
      SongNameInSmallModal.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
   
      //displaying song name in posture 
      pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;   
   }//if (seekbar.value == 100)
}//function isSongCompleated()
setInterval(isSongCompleated, 500);
//=============================================//




//---------------------------------------------//
//           UP AND DOWN ANIMATION             //
//---------------------------------------------//
//---- Handling browser back button ----//
window.addEventListener('popstate', manageWindowHistory);



//---- Handling up animation ----//
//adding eventListener to small modal song  name
//when you click on controll panel ka song name then sp music section will come up
SongNameInSmallModal.addEventListener('click', ()=>{
   //if the spMusicKaMainContainer dont have this class => .up then add that class & etc
   if(spMusicKaMainContainer.matches(".up") == false){
   	  //hiding first section
   	  mainContainerOfFirstSec.style.display = 'none';
      //aading class => up, to sp sectio's main container
      spMusicKaMainContainer.classList.add("up");
      //pushing a new history to browser
      window.history.pushState({id: 1}, null, "?q=1234&u=spSecUp");
      //if it will true then we will play DownAnimation on click of brouser back button
      shouldWeCallDownAnimationFunction = true;
   }//if
});



//---- handling the down animation ----//
//when you click on back button of sp section's navbar then sp section will go down
//adding event listener to back button of sp section's navbar
spBack.addEventListener('click', ()=>{
   //calling downAnimation()
   downAnimation()
   //removing the window history
   window.history.back()
});//event listener on sp section's back btn 

//function for down animation
function downAnimation(){
   //hiding first section
   mainContainerOfFirstSec.style.display = 'block';
   //removing tha class list 'up' from sp section's main container because now page will go down not => up
   spMusicKaMainContainer.classList.remove("up");
   //adding the class list 'down' to main container of sp section to play the down animation
   spMusicKaMainContainer.classList.add('down');
   //if it will false then we will not play DownAnimation on click of brouser back button
   shouldWeCallDownAnimationFunction = false;
   //setTimeOut to remove the class list => down from main container of sp section after one(1) second
   setTimeout(()=>{
      spMusicKaMainContainer.classList.remove('down');
   }, 500);//setTimeOut  
};//downAnimation()
//=============================================//





//---------------------------------------------//
//              SEARCHBAR SECTION              //
//---------------------------------------------//




//== displaying search page on click of search btn on nav ==//
searchBtnOnNavbar.addEventListener('click', ()=>{
   toggleClassHide();
});
//this will both hide & show the search page by toggling the class 'hide';
function toggleClassHide(){   
   containerOfFirstSec.classList.toggle('hide');
   mainContainerOfSearchPage.classList.toggle('hide');
   //used for handling browser back button
   window.history.pushState({id: 2}, null, "?q=1234&u=searchPageOpened");
   //if this is true then we will call 'toggleClassHide' function on click of brouser back button
   shouldWeCallToggleClassHideFunction = true;
}
//=============================================//




//== GENERATING SUGGESTION BOX FOR ALL SONGS ==//
//Id generated by this function will used as index number to play song
let initialId2 = 0;
function idGenerator2(){
   initialId = initialId2 + 1;
   maxSong = initialId;
   return initialId;
}


//GENERATING SUGGESTION BOX FOR ALL SONGS
try{
  songArr.forEach((ele)=>{
     //value returned by idGenerator2 function
     let idInNum = idGenerator2();
   
     suggestionBoxCon.innerHTML +=`
       <div class="suggestion-box">
          <span class="suggest-box-span" id="span${idInNum}"> ${ele.name} </span>
          <span class="upRightArrowSpan"> 
            &nearrow;
          </span>
       </div> 
     `
        
     //initialId2 = value returned by idGenerator2
     initialId2 = idInNum;
  });//for each on song array
}
catch(err){}
//=============================================//




//== FILTER SEARCH SUGGESTION ON KEYPRESS ON INPUT ==//
inp.addEventListener('keydown', ()=>{
   //converting value or input to uppercase
   filter = inp.value.toUpperCase();
   //getting all suggestion box by className
   li = document.getElementsByClassName('suggestion-box');
 
   // Loop to all list items, and hide those who don't match the search query
   for (i = 0; i < li.length; i++) {
       a = li[i].getElementsByTagName("span")[0];
       txtValue = a.textContent || a.innerText;
      
       if (txtValue.toUpperCase().indexOf(filter) > -1) {
         li[i].style.display = "block";
       }
       else{
         li[i].style.display = "none";
       }
   }
});//keydown event listener on input
//=============================================//




//---------------------------------------------//
// PLAYING SONG ON CLICK ON ANY SEGGESTED BOX  //
//---------------------------------------------//
//span tag of suggestion box
let suggestBoxSpan = document.querySelectorAll('.suggest-box-span');


//== playing the clicked suggestion box song ==//
Array.from(suggestBoxSpan).forEach((box)=>{
  //adding event listener to all suggestion boxes span
  box.addEventListener('click', (e)=>{
     //converting music box play button (paused);
     //music box of currently playing song
     document.getElementById(`${songIndex}`).src = pausedBtnSource
  
     //song index = id of clicked suggest box
     let a = e.target.id;
     let removed = a.replace('span', '')
     let integer = parseInt(removed)
     songIndex = integer;
     //setting src of audio element
     let songSource = songArr[songIndex - 1].source;
     
     audioElement.src = `${songSource}`;
     //clear the value of search input
     inp.value = ""
     //play the audio
     audioElement.play()
     window.history.back()    
          
     //Changing play btn of sp sec & small modal to (playing) btn
     controllPanelPlayBtn.forEach((playBtn)=>{
       playBtn.src = playingBtnSource;;
     });

     //getting the play btn of music box
     //so that we can add playing image
     document.getElementById(`${songIndex}`).src = playingBtnSource;
     //controll panel ka song name para
     SongNameInSmallModal.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
     //displaying song name in posture 
     pSongName.innerHTML = document.querySelector(`.p${songIndex}`).innerText;
  })//event listener on all suggestion box
});//for each on all suggestion box
//=============================================//




//== HANDLING WHAT WILL HAPPEN ON BROWSER BACK BTN ==//
function manageWindowHistory(){
   if (shouldWeCallDownAnimationFunction == true) {
      downAnimation();
   }
   if (shouldWeCallToggleClassHideFunction == true) {
      toggleClassHide();
      shouldWeCallToggleClassHideFunction = false;
      window.history.back()
   }
}
//=============================================//
