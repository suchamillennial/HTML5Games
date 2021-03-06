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
    this.myCarPic; // Which picture to use 

    // Add input movement properties
    // variable to see if the key is being held down
    this.keyHeld_Gas = false;
    this.keyHeld_Reverse = false;
    this.keyHeld_Left = false;
    this.keyHeld_Right = false;

    // Store information for what the control keys for the car are
    this.controlKeyUp;
    this.controlKeyDown;
    this.controlKeyLeft;
    this.controlKeyRight;

    this.setupInput = function(upKey, downKey, leftKey, rightKey) {
        
        this.controlKeyUp = upKey;
        this.controlKeyDown = downKey;
        this.controlKeyLeft = leftKey;
        this.controlKeyRight = rightKey;
    }

    this.reset = function(whichImage) {
        this.myCarPic = whichImage;

        for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
            for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){
    
                var arrayIndex = rowColToArrayIndex(eachCol,eachRow);
    
                if(trackGrid[arrayIndex]==TRACK_PLAYERSTART){
                    // Replace the car with a road
                    trackGrid[arrayIndex] = TRACK_ROAD;
                    // Get the radians since 1 radian is 180 degrees
                    this.ang = 0 * Math.PI/180.0;
                    this.x = (eachCol)*TRACK_W +(TRACK_W/2);
                    this.y = (eachRow)*TRACK_H +(TRACK_H/2);
                    return;
                }
            }
        }
    } // End of carReset();

    this.move = function() {
            
        // Degrade speed each frame
        this.speed*= GROUNDSPEED_DECAY_MULT;
    
        if(this.keyHeld_Gas){
            this.speed += DRIVE_POWER;
        }
        if(this.keyHeld_Reverse){
            this.speed -= REVERSE_POWER;
        }
        if(Math.abs(this.speed) > 0.5){
            if(this.keyHeld_Right){
                this.ang += TURN_RATE;
            }
            if(this.keyHeld_Left){
                this.ang -= TURN_RATE;
            }
        }
        this.speedX = Math.cos(this.ang)*this.speed;
        this.speedY = Math.sin(this.ang)*this.speed;
        // console.log(carSpeed);
        // console.log(carSpeedX);
        // console.log(carSpeedY);
        // carAng += 0.02;
    
        this.x += this.speedX;
        this.y += this.speedY;

        carTrackHandling(this);

    } // End of carMove

    this.draw = function() {
        drawBitmapCenteredWithRotation(this.myCarPic, this.x, this.y, this.ang);
    }
}







