var carPic = document.createElement("img");
// Image loading is async so we need a bool to show if it is loaded
var carPicLoaded = false;

// Set up game object variables
var carX = 0;
var carY = 0;
var carAng = 0;
var carSpeed = 5;
var carSpeedX = 0;
var carSpeedY = 0;

const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = .1;