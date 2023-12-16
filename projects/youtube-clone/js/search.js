//this is search botton
let search = document.getElementById('search-btn');

//this is main container or search.html
let pageMainCon = document.getElementById('page-ka-main-container');

//this is video container
//here video boxes will be appent
let videoCon = document.getElementById("videos-container");

//this is input tag or search bar
let inp = document.getElementById("myInput");

//this is api key 
let api = "AIzaSyDJls1vKAThO_v7-SdtdnvIBc6PZkdX75A";

//container of search suggestion box
let containerOfSearchSuggestion = document.getElementById('suggested-search-container');

//image of delete all history button
let deleteAllSearchHistoryImage = document.querySelector('#search-delete');
//---------------------------------------//




//----Function to store searched query in array----//
function storeSearchedQuery(){
  let searchedQuery = inp.value;
  
  //if searchedHistoryArray is not saved in localStorage then save it
  if(localStorage.getItem('searchedHistoryArray') === null){
    let array = []
    localStorage.setItem('searchedHistoryArray', JSON.stringify(array));
  }
  
  //getting searched history array from local storage
  let historyArray = JSON.parse(localStorage.getItem('searchedHistoryArray'));
  //pushing searched query in 'historyArray'
  historyArray.push(searchedQuery);
  //again saving 'historyArray' to localStorage
  localStorage.setItem('searchedHistoryArray', JSON.stringify(historyArray));
  console.log(JSON.stringify(localStorage.getItem('searchedHistoryArray')));
}
//-----------------------------------------//




//----Function to display searched history----//
function displaySearchedHistory(){
  //getting searched history array from local storage
  let historyArray = JSON.parse(localStorage.getItem('searchedHistoryArray'));
  //this id will work like index number
  let id = 0;
  //reversing array wrapped in try & catch because if array is empty then this reverse method will throw error
  try{
     historyArray.reverse();
  }
  catch(err){ }
    
  //generating & displaying search suggestion boxes according to 'historyArray'
  try{
     historyArray.forEach((query, index)=>{
        containerOfSearchSuggestion.innerHTML += `
          <div class="suggested-search-box">
             <span class="suggest-search-span">
               ${query}
             </span>
             <img src="../assets/cut.png" id='${id}' class="cutBtnInsideSearchSuggestionBox"/>
          </div>
        `;
         id += 1;          
     });//forEach
  }
  catch(err){ }
}
displaySearchedHistory()
//-----------------------------------------//




//----Logic to delete specific search history----//
//cut button inside search suggestion box
let cutBtnInsideSearchSuggestionBox = document.querySelectorAll('.cutBtnInsideSearchSuggestionBox');

Array.from(cutBtnInsideSearchSuggestionBox).forEach((cutBtn, index)=>{
  //getting searched history array from local storage
  let historyArray = JSON.parse(localStorage.getItem('searchedHistoryArray'));
  //reversing 'historyArray'
  historyArray = historyArray.reverse();
  
  
  //event listener on every cut button inside box
  cutBtn.addEventListener('click', (e)=>{
     //id of clicked cut button work as index number
     clickedBtnIndexNum = e.target.id
     //deleting clicked element equery from 'historyArray'
     delete historyArray[clickedBtnIndexNum];
     
     //filtering undefined query returned by delete method
     let newHistoryArray = historyArray.filter((query)=>{
       return query != undefined;
     });
    
     //reversing 'newHistoryArray' returned by filter mothod
     newHistoryArray = newHistoryArray.reverse()
     //saving array returned by filter method to local storage
     localStorage.setItem('searchedHistoryArray', JSON.stringify(newHistoryArray));
     //reloading the page
     window.location.reload()
  });
});
//-----------------------------------------//




//----Logic to delete all history----//
function deleteAllSearchHistory(){
  //removing whole history array from localStorage
  localStorage.removeItem('searchedHistoryArray');
  window.location.reload();  
}
//-----------------------------------------//




//----handling search icon click----//
//when you will click on search btn or icon then...
//adding event listener on search button
search.addEventListener('click', ()=>{
  //query will come from value of input tag
  let query = inp.value;
  //saving the value of query(value or input tag) into the local storage
  localStorage.setItem('searched', query);
  //this function will store searched query in array
  storeSearchedQuery();
  //this will redirect to after search page where searched videos will ne displayed
  location.href = "../html/after-search.html";
});//event listener on search button
//---------------------------------------//




//----handling box suggested search click----//
//all suggestion search search-box
let spanEle = document.querySelectorAll(".suggest-search-span");

//forEach loop to get all span or suggest box
Array.from(spanEle).forEach((item) =>{
   //adding event listener to all span of suggest box
   item.addEventListener('click', (e)=>{
      //query will come from value suggestion box span
      let query = e.target.innerText; 
      //saving the value of query(value or input tag) into the local storage
      localStorage.setItem('searched', query)   
      //this will redirect to 'after search page' where searched videos will be displayed
      location.href = "../html/after-search.html";
   });//event listener on search button
})//for each on span of suggest search box
//---------------------------------------//





