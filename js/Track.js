

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

// This function calculates the index of a specific track
function rowColToArrayIndex(col, row) {
    return col + TRACK_COLS * row;
}

function drawTracks(){
    // console.log("Drawing Tracks");
    for(let eachRow = 0; eachRow < TRACK_ROWS; eachRow++){
        for(let eachCol = 0; eachCol < TRACK_COLS; eachCol++){

            var arrayIndex = rowColToArrayIndex(eachCol,eachRow);

            if(trackGrid[arrayIndex]==TRACK_ROAD){
                canvasContext.drawImage(roadPic,TRACK_W*eachCol, TRACK_H*eachRow);
            }else if(trackGrid[arrayIndex]==TRACK_WALL){
                canvasContext.drawImage(wallPic,TRACK_W*eachCol, TRACK_H*eachRow);
            }
        }
    }
    // for(let i = 0; i < TRACK_COUNT; i++){
    //     if(trackGrid[i]){
    //         colorRect(TRACK_W*i,0, TRACK_W-TRACK_GAP, TRACK_H-TRACK_GAP, "blue");
    //     }
    // }
    
}