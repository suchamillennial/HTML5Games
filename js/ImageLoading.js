var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

// Instead of individual bools to check if pics are loaded we will keep a counter to check all pics
var picsToLoad= 0;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    console.log(picsToLoad);
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

// Generic helper function
function beginLoadingImage(imgVar, fileName) {
    imgVar.onload = countLoadedImagesAndLaunchIfReady;
    imgVar.src = "images/" + fileName;
}

function loadImages() {
    var imageList = [
        {varName: carPic, fileName: "player1car.png"},
        {varName: roadPic, fileName: "track_road.png"},
        {varName: wallPic, fileName: "track_wall.png"}
    ];

    // Set the number of Images
    picsToLoad = imageList.length;

    // Loop through images and call helper function
    for(var i = 0; i < imageList.length; i++){
        beginLoadingImage(imageList[i].varName, imageList[i].fileName);
    }
}