var carPic = document.createElement("img");
var otherCarPic = document.createElement("img");
var trackPics = [];

var roadPic = document.createElement("img");
var wallPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");
var finishPic = document.createElement("img");

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

function loadImageForTrackCode(trackType, fileName) {
    trackPics[trackType] = document.createElement('img');
    beginLoadingImage(trackPics[trackType], fileName);

}

function loadImages() {
    var imageList = [
        {varName: carPic, fileName: "player1car.png"},
        {varName: otherCarPic, fileName: "player2car.png"},

        {trackType: TRACK_ROAD, fileName: "track_road.png"},
        {trackType: TRACK_WALL, fileName: "track_wall.png"},
        {trackType: TRACK_FINISH, fileName: "track_finish.png"},
        {trackType: TRACK_TREE, fileName: "track_tree.png"},
        {trackType: TRACK_FLAG, fileName: "track_flag.png"}
    ];

    // Set the number of Images
    picsToLoad = imageList.length;

    // Loop through images and call helper function
    for(var i = 0; i < imageList.length; i++){
        // Check if imagelist varName exists
        if(imageList[i].varName!= undefined){
            beginLoadingImage(imageList[i].varName, imageList[i].fileName);
        }else{
            loadImageForTrackCode(imageList[i].trackType, imageList[i].fileName);
        }
    }
}