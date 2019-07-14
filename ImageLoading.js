var carPic = document.createElement("img");
var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

// Instead of individual bools to check if pics are loaded we will keep a counter to check all pics
var picsToLoad;

function countLoadedImagesAndLaunchIfReady() {
    picsToLoad--;
    if(picsToLoad == 0){
        imageLoadingDoneSoStartGame();
    }
}

function carImageLoad() {
    carPic.onload = countLoadedImagesAndLaunchIfReady;
    carPic.src = "player1car.png";
}

function trackLoadImages() {
    roadPic.onload = countLoadedImagesAndLaunchIfReady;
    wallPic.onload = countLoadedImagesAndLaunchIfReady;

    roadPic.src = "track_road.png";
    wallPic.src = "track_wall.png";
}

function loadImages() {
    trackLoadImages();
    carImageLoad();
}