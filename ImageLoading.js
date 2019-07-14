var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

// Instead of individual bools to check if pics are loaded we will keep a counter to check all pics
var picsToLoad= 3;

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
    imgVar.src = fileName;
}

function carImageLoad() {
    beginLoadingImage(carPic, "player1car.png");
}

function trackLoadImages() {
    beginLoadingImage(roadPic, "track_road.png");
    beginLoadingImage(wallPic, "track_wall.png");
}

function loadImages() {
    trackLoadImages();
    carImageLoad();
}