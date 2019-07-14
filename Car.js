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

function carReset(){
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol,eachRow);

            if(trackGrid[arrayIndex]==TRACK_PLAYERSTART){
                // Replace the car with a road
                trackGrid[arrayIndex] = TRACK_ROAD;
                // Get the radians since 1 radian is 180 degrees
                carAng = 0 * Math.PI/180.0;
                carX = (eachCol)*TRACK_W +(TRACK_W/2);
                carY = (eachRow)*TRACK_H +(TRACK_H/2);
            }
        }
    }
}

function carMove() {
            
    // Degrade speed each frame
    carSpeed*= GROUNDSPEED_DECAY_MULT;

    if(keyHeld_Gas){
        carSpeed += DRIVE_POWER;
    }
    if(keyHeld_Reverse){
        carSpeed -= REVERSE_POWER;
    }
    if(keyHeld_Right){
        carAng += TURN_RATE;
    }
    if(keyHeld_Left){
        carAng -= TURN_RATE;
    }
    carSpeedX = Math.cos(carAng)*carSpeed;
    carSpeedY = Math.sin(carAng)*carSpeed;
    // console.log(carSpeed);
    // console.log(carSpeedX);
    // console.log(carSpeedY);
    // carAng += 0.02;

    carX += carSpeedX;
    carY += carSpeedY;
}