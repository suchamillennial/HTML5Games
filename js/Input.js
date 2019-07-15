// Const key codes
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;




// Make mouse coordinates global
var mouseX = 10;
var mouseY = 10;

function setupInput() {
    // Add event listener to get input from mouse movement
    canvas.addEventListener("mousemove", updateMousePosition);
            
    // Add keyboard input on the document because the keyboard needs to be on the page not the canvas
    // Add event listener for pressing and releasing
    document.addEventListener("keydown", keyPressed);
    document.addEventListener("keyup", keyReleased);

}

function keySet (whichCar, setTo, evt) {

    switch(evt.keyCode){
        case whichCar.controlKeyLeft: 
            whichCar.keyHeld_Left = setTo;
            break;
        case whichCar.controlKeyRight: 
            whichCar.keyHeld_Right = setTo;
            break;
        case whichCar.controlKeyUp: 
            whichCar.keyHeld_Gas = setTo;
            break;
        case whichCar.controlKeyDown: 
            whichCar.keyHeld_Reverse = setTo;
            break;
    }
}

function keyPressed(evt){
    keySet(blueCar,true, evt);
    keySet(greenCar,true, evt);
}

function keyReleased(evt){
    keySet(blueCar, false, evt);
    keySet(greenCar, false, evt);
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