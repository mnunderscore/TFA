'use strict'

console.clear();

const rand = ( max = 1, min = 0, { round = false } = {} ) => {
    let n = Math.random() * ( max - min ) + min;
    if( round ){
    return Math.round( n );
    }
    return n;
};

const getRandomElement = ( array ) => {
    const randomIndex = Math.floor( Math.random() * array.length );
    return array[ randomIndex ];
};

const track = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
];

let genCoords = [0,0]
let checkpoints = [[0,0]] // Initialize checkpoints as an array of arrays
let pointer = [0,0]
let closestCheckpoint = checkpoints[0];
let closestDistance = Infinity; // Initialize closestDistance to Infinity

for (let i = 0; i < 5; i++) {

    if (i == 0) {
        genCoords = [rand(3,1,{round:true}),rand(3,1,{round:true})];
        track[genCoords[1]][genCoords[0]] = i + 1;
        checkpoints[0] = [genCoords[1],genCoords[0]];
        pointer = [genCoords[1],genCoords[0]];
    } else {
        do {
            genCoords = [rand(8,1,{round:true}),rand(8,1,{round:true})];
        } while (track[genCoords[1]][genCoords[0]] !== 0);
        track[genCoords[1]][genCoords[0]] = i + 1;
        checkpoints.push([genCoords[1],genCoords[0]]); // Push the pair of coordinates as an array
    };
};

for (let i = 1; i < checkpoints.length; i++) {
    const checkpoint = checkpoints[i];
    const distance = Math.sqrt(Math.pow(pointer[1] - checkpoint[1], 2) + Math.pow(pointer[0] - checkpoint[0], 2));

    if (distance < closestDistance) {
        closestCheckpoint = [checkpoint[1], checkpoint[0]]; // Swapped order
        closestDistance = distance;
    }
}


console.log("Closest checkpoint:", closestCheckpoint);

console.table(track);

document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector( '.block__centered' ),
        w = window.innerWidth,
        h = window.innerHeight,
        dpr = window.devicePixelRatio;

    const canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext( '2d' ),
        realWidth = Math.round( w * 0.3 ),
        realHeight = realWidth;

    const canvasSetup = () => {
        canvas.width = realWidth * dpr;
        canvas.height = realHeight * dpr;

        canvas.style.width = `${ realWidth }px`;
        canvas.style.height = `${ realHeight }px`;

        canvas.style.transform = "rotate(0deg)";
        canvas.style.webkitTransform = "rotate(0deg)";

        ctx.scale( dpr, dpr );

        body.appendChild( canvas );
    };

    const cols = 10;
    const squareSize = realWidth / cols;
    const color = "black";


    const draw = () => {

        const trackMatrix = track.map(row => row.map(cell => {
            switch (cell) {
                case 0:
                    return "white";
                case 1:
                    return "blue";
                case 2:
                    return "green";
                case 3:
                    return "orange";
                case 4:
                    return "purple";
                case 5:
                    return "yellow";
                case 6:
                    return "pink";
                case 10:
                    return "black";
                case 11:
                    return "black";
                case "D":
                    return "red";
                default:
                    return "white";
            }
        }));

        ctx.fillStyle = color;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < cols; j++) {
                ctx.fillStyle = trackMatrix[i][j];
                ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
            }
        }
    };

    canvasSetup();
    draw();
});
