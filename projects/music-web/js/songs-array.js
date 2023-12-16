//songs array
let songArray =[
 {
  source: "../assets/songs/1.mp3",
  name: "Bachpan ka pyar hindi song ",
 },
 {
  source: "../assets/songs/2.mp3",
  name: "Baby passalli hindi dj song",
 },
 {
  source: "../assets/songs/3.mp3",
  name: "Ekda Ekda old hit gold song",
 },
 {
  source: "../assets/songs/4.mp3",
  name: "Bhola diwana ke mja song",
 },
 {
  source: "../assets/songs/5.mp3",
  name: "Gudul gadul gal chhattisgarhi",
 },
 {
  source: "../assets/songs/6.mp3",
  name: "Har har sambhu sanskrit song",
 },
 {
  source: "../assets/songs/7.mp3",
  name: "Mongra ke maya chhattisgarhi",
 },
 {
  source: "../assets/songs/8.mp3",
  name: "Nagpuri hello rani hai rani",
 },
 {
  source: "../assets/songs/9.mp3",
  name: "Nili Nili akhiya chhattisgarhi",
 },
 {
  source: "../assets/songs/10.mp3",
  name: "Mona Mona chhattisgarhi song",
 },
 {
  source: "../assets/songs/11.mp3",
  name: "Same Same hindi song",
 },
 {
  source: "../assets/songs/12.mp3",
  name: "Kon jagah le maris bichhchhi",
 },
];//song array


let stringSongArr = JSON.stringify(songArray);
localStorage.setItem("songArrData", stringSongArr);
