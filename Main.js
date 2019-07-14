
        // Set up canvas variables
        var canvas, canvasContext;
        
        carReset();

        

        window.onload = function() {
            // Attach the HTML canvas to a variable
            canvas = document.getElementById("gameCanvas");
            // Get the graphics buffer for doing graphics
            canvasContext = canvas.getContext('2d');
            
            // Set FPS and have the updateAll function refresh according to that FPS
            var fps = 30;
            setInterval(updateAll,1000/fps);
            
            setupInput();
            
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

        function moveAll() {
            carMove();
            carTrackHandling();
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
        
        
        
        

        

        

        