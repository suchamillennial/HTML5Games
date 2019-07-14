var carPic = document.createElement("img");
// Image loading is async so we need a bool to show if it is loaded
var carPicLoaded = false;

var roadPic = document.createElement("img");
var wallPic = document.createElement("img");

var roadPicLoaded = false;
var wallPicLoaded = false;

function carImageLoad() {
    // Set carPicLoaded bool to true when it is loaded
    carPic.onload = function() {
        carPicLoaded = true;
    }
    carPic.src = "player1car.png";
}

function trackLoadImages() {

    roadPic.src = "track_road.png";
    wallPic.src = "track_wall.png";
}

function loadImages() {
    trackLoadImages();
    carImageLoad();
}