const GROUNDSPEED_DECAY_MULT = 0.98;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = .1;
// Car shouldnt turn in place
const MIN_SPEED_TO_TURN = 0.5;

function carClass() {
    // Set up game object variables
    this.x = 0;
    this.y = 0;
    this.ang = 0;
    this.speed = 5;
    this.speedX = 0;
    this.speedY = 0;

    this.carReset = function() {
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
    } // End of carReset();

    this.carMove = function() {
            
        // Degrade speed each frame
        carSpeed*= GROUNDSPEED_DECAY_MULT;
    
        if(keyHeld_Gas){
            carSpeed += DRIVE_POWER;
        }
        if(keyHeld_Reverse){
            carSpeed -= REVERSE_POWER;
        }
        if(Math.abs(carSpeed) > 0.5){
            if(keyHeld_Right){
                carAng += TURN_RATE;
            }
            if(keyHeld_Left){
                carAng -= TURN_RATE;
            }
        }
        carSpeedX = Math.cos(carAng)*carSpeed;
        carSpeedY = Math.sin(carAng)*carSpeed;
        // console.log(carSpeed);
        // console.log(carSpeedX);
        // console.log(carSpeedY);
        // carAng += 0.02;
    
        carX += carSpeedX;
        carY += carSpeedY;
    } // End of carMove

    this.drawCar = function() {
        drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
    }
}







