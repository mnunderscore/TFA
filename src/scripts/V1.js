
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

const directions = [0,1,2,3];
let currentCoords = [rand(8,1,{round:true}),rand(8,1,{round:true})];
let possibleCoords = [0,0];

track[currentCoords[1]][currentCoords[0]] = 11;

for (let i = 0; i < 5; i++) {
    do{
        const direction = 0;
        possibleCoords = currentCoords.slice();
        if (possibleCoords[0] == 0) {
            direction = rand(3,2,{round:true});
        } else if (possibleCoords[0] == 9) {
            direction = rand(3,2,{round:true});
        } else if (possibleCoords[1] == 0) {
            direction = rand(1,0,{round:true});
        } else if (possibleCoords[1] == 9) {
            direction = rand(1,0,{round:true});
        } else {
            direction = rand(3,0,{round:true});
        }

        switch (direction) {
            case 0:
                possibleCoords[1] = currentCoords[1] - 1;
                break;
            case 1:
                possibleCoords[0] = currentCoords[0] + 1;
                break;
            case 2:
                possibleCoords[1] = currentCoords[1] + 1;
                break;
            case 3:
                possibleCoords[0] = currentCoords[0] - 1;
                break;
        };
    } while (track[possibleCoords[1]][possibleCoords[0]] !== 0);

    track[possibleCoords[1]][possibleCoords[0]] = 1;
    currentCoords = possibleCoords.slice();

    console.log(currentCoords);
};

console.table(track);

document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector( '.left-column' ),
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
