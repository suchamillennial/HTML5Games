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

function keySet (setTo) {

    switch(evt.keyCode){
        case KEY_LEFT_ARROW: 
            keyHeld_Left = setTo;
            break;
        case KEY_RIGHT_ARROW: 
            keyHeld_Right = setTo;
            break;
        case KEY_UP_ARROW: 
            keyHeld_Gas = setTo;
            break;
        case KEY_DOWN_ARROW: 
            keyHeld_Reverse = setTo;
            break;
    }
}

function keyPressed(evt){
    keySet(true);
}

function keyReleased(evt){
    keySet(false);
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