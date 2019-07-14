function drawBitmapCenteredWithRotation(useBitmap, atX, atY, withAng){
    // Save the canvas properties
    canvasContext.save();
    // Moves car to the top (0,0)
    canvasContext.translate(atX, atY);
    // rotates car arount its center
    canvasContext.rotate(withAng);
    // move and draw the bitmap back at its correct location
    canvasContext.drawImage(useBitmap, -useBitmap.width/2, -useBitmap.height/2);
    // restore the canvas settings for working on the next images
    canvasContext.restore();
}

// Refactored method for drawing rectangle
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, boxColor){
    canvasContext.fillStyle = boxColor;
    canvasContext.fillRect(topLeftX,topLeftY,boxWidth,boxHeight);
}

// Refactored Method for drawing the car
function colorCircle(centerX, centerY, radius, fillColor) {
    // Use Arc to draw a circle 
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,2*Math.PI, true);
    canvasContext.fill();
}

// Create function for writing text
function colorText(showWords,textX,textY,fillColor){
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords,textX,textY);
}