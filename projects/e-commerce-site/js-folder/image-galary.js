//this function will show image of small container to big image container
function galaryFunction(smallImg){
 //getting full image tag
 let fullImage = document.getElementById('big-img');
 
 /* changing src or full image tag */
 fullImage.src = smallImg.src;
}
