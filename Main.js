
        // Set up canvas variables
        var canvas, canvasContext;
        
        carReset();

        

        window.onload = function() {
            // Attach the HTML canvas to a variable
            canvas = document.getElementById("gameCanvas");
            // Get the graphics buffer for doing graphics
            canvasContext = canvas.getContext('2d');
            
            // Load Images before everything else
            loadImages();

        }

        // This is a dumbass name
        function imageLoadingDoneSoStartGame() {
            // Set FPS and have the updateAll function refresh according to that FPS
            var fps = 30;
            setInterval(updateAll,1000/fps);
            
            setupInput();


            carReset();
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

        function clearScreen() {
            colorRect(0,0,canvas.width,canvas.height,"black");
        }

        function drawAll(){
            drawTracks();
            drawCar();
            
        }
        
        
        
        

        

        

        