
        // Set up canvas variables
        var canvas, canvasContext;
        
        // Const key codes
        const KEY_LEFT_ARROW = 37;
        const KEY_RIGHT_ARROW = 39;
        const KEY_UP_ARROW = 38;
        const KEY_DOWN_ARROW = 40;

        // variable to see if the key is being held down
        var keyHeld_Gas = false;
        var keyHeld_Reverse = false;
        var keyHeld_Left = false;
        var keyHeld_Right = false;

        var carPic = document.createElement("img");
        // Image loading is async so we need a bool to show if it is loaded
        var carPicLoaded = false;

        // Make mouse coordinates global
        var mouseX = 10;
        var mouseY = 10;

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

        const TRACK_W = 40;
        const TRACK_H = 40; 
        const TRACK_GAP = 2;
        const TRACK_COLS = 20;
        const TRACK_ROWS = 15;
        var trackGrid= [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,
                        1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,
                        1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

        const TRACK_ROAD = 0;
        const TRACK_WALL = 1;
        const TRACK_PLAYERSTART = 2;
        

        carReset();

        function keyPressed(evt){
            // Print which key was pressed
            // console.log("Key Pressed: " + evt.keyCode);
            switch(evt.keyCode){
                case KEY_LEFT_ARROW: 
                    keyHeld_Left = true;
                    break;
                case KEY_RIGHT_ARROW: 
                    keyHeld_Right = true;
                    break;
                case KEY_UP_ARROW: 
                    keyHeld_Gas = true;
                    break;
                case KEY_DOWN_ARROW: 
                    keyHeld_Reverse = true;
                    break;
            }
        }

        function keyReleased(evt){
            // Print which key was pressed
            // console.log("Key Released: " + evt.keyCode);
            switch(evt.keyCode){
                case KEY_LEFT_ARROW: 
                    keyHeld_Left = false;
                    break;
                case KEY_RIGHT_ARROW: 
                    keyHeld_Right = false;
                    break;
                case KEY_UP_ARROW: 
                    keyHeld_Gas = false;
                    break;
                case KEY_DOWN_ARROW: 
                    keyHeld_Reverse = false;
                    break;
            }
        }

        window.onload = function() {
            // Attach the HTML canvas to a variable
            canvas = document.getElementById("gameCanvas");
            // Get the graphics buffer for doing graphics
            canvasContext = canvas.getContext('2d');
            
            // Set FPS and have the updateAll function refresh according to that FPS
            var fps = 30;
            setInterval(updateAll,1000/fps);
            
            // Add event listener to get input from mouse movement
            canvas.addEventListener("mousemove", updateMousePosition);
            
            // Add keyboard input on the document because the keyboard needs to be on the page not the canvas
            // Add event listener for pressing and releasing
            document.addEventListener("keydown", keyPressed);
            document.addEventListener("keyup", keyReleased);

            // Set carPicLoaded bool to true when it is loaded
            carPic.onload = function() {
                carPicLoaded = true;
            }
            carPic.src = "player1car.png";
            // carReset();
        }

        // This is the function for drawing to and updating the canvas
        function updateAll() {
            moveAll();
            drawAll();    
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

        // Helper function for getting data on tracks
        function isWallAtColRow(col, row){
            if(col >= 0 && col < TRACK_COLS && row >= 0 && row < TRACK_ROWS){
                
            var trackIndexUnderCoord = rowColToArrayIndex(col, row);

            return trackGrid[trackIndexUnderCoord] == TRACK_WALL;
            }else{
                return false;
            }
        }

        // We don't know if a collision happened so it is handling
        function carTrackHandling() {

            // Draw the car coordinates
            var carTrackCol = Math.floor(carX / TRACK_W);
            var carTrackRow = Math.floor(carY / TRACK_H);
            var trackIndexUndercar = rowColToArrayIndex(carTrackCol, carTrackRow);

            if(carTrackCol >= 0 && carTrackCol < TRACK_COLS &&
                carTrackRow >= 0 && carTrackRow < TRACK_ROWS){
                // Check if there is a track that should even be removed
                if(isWallAtColRow(carTrackCol,carTrackRow)){
                    // console.log("colide");
                    // Go backwards by the speed in order to not get stuck in the wall
                    carX -= Math.cos(carAng)*carSpeed;
                    carY -= Math.sin(carAng)*carSpeed;
                    carSpeed *= -0.5;
                } // end of TRACK found
            } // end of valid col and row
        }

       

        function moveAll() {
            carMove();
            carTrackHandling();
            
            // colorText((carTRACKCol)+","+(carTRACKRow) +": "+ trackIndexUndercar,carX,carY,"cyan");

            // if(trackIndexUndercar >= 0 && trackIndexUndercar < TRACK_COLS < TRACK_ROWS){
            //     trackGrid[trackIndexUndercar] = false;
            // }

        }

        function drawAll(){
            
            // Draw Canvas
            colorRect(0,0,canvas.width,canvas.height,"black");
            // Draw Car
            // colorCircle(carX,carY,10,"red");

            // If the carpic is loaded then draw it
            if(carPicLoaded){
                // console.log("car drawn");
                drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
            }
            // Draw the tracks
            drawTracks();
            
        }
        
        
        
        // This function calculates the index of a specific track
        function rowColToArrayIndex(col, row) {
            return col + TRACK_COLS * row;
        }

        function drawTracks(){
            // console.log("Drawing Tracks");
            for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
                for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

                    var arrayIndex = rowColToArrayIndex(eachCol,eachRow);

                    if(trackGrid[arrayIndex]==1){
                        colorRect(TRACK_W*eachCol,TRACK_H*eachRow, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, "blue");
                    }
                }
            }
            // for(let i = 0; i < TRACK_COUNT; i++){
            //     if(trackGrid[i]){
            //         colorRect(TRACK_W*i,0, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, "blue");
            //     }
            // }
            
        }

        // Method for getting mouse data that is called when the mouse is moved
        function updateMousePosition(event){
            // get position on page of canvas
            var rect = canvas.getBoundingClientRect();
            var root = document.documentElement;

            // Get the mouse location - the document scrolling and bounding
            mouseX = event.clientX - rect.left - root.scrollLeft;
            mouseY = event.clientY - rect.top - root.scrollTop;

            // carCheat();
            
        }

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