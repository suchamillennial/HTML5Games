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