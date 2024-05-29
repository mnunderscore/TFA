// TODO: add directions to checkpoints
// TODO: set correct rotation to corners

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

var trackSize = 0
var numCheckpoints = 0;
var canvas = null; // Added variable to store the canvas element

document.addEventListener("DOMContentLoaded", function() {

    var trackSizeSelect = document.getElementById('track-size');
    var numCheckpointsSelect = document.getElementById('checkpoint-number');
    const regenerateTrackButton = document.getElementById('regenerate-track');

    function recalculate() {

        console.clear();

        var trackSizeOption = trackSizeSelect.options[trackSizeSelect.selectedIndex].value;
        var numCheckpointsOption = numCheckpointsSelect.options[numCheckpointsSelect.selectedIndex].value;

        if (trackSizeOption === 'small') {
            trackSize = 8;
        } else if (trackSizeOption === 'mid') {
            trackSize = 10;
        } else if (trackSizeOption === 'large') {
            trackSize = 12;
        }

        if (numCheckpointsOption === '4') {
            numCheckpoints = 4;
        } else if (numCheckpointsOption === '6') {
            numCheckpoints = 6;
        } else if (numCheckpointsOption === '8') {
            numCheckpoints = 8;
        }

        const track = Array.from({ length: trackSize }, () => Array(trackSize).fill(0));

        let genCoords = [0,0]
        let checkpoints = [[0,0]]

        do {
            genCoords = [rand(trackSize-1,1,{round:true}),rand(trackSize-1,1,{round:true})];
            track[genCoords[1]][genCoords[0]] = 98;
            checkpoints[0] = [genCoords[1],genCoords[0]];
            pointer = [genCoords[1],genCoords[0]];
        } while (!findPath(JSON.parse(JSON.stringify(track)), checkpoints[0], genCoords));

        for (let i = 1; i < numCheckpoints; i++) {
            let path;
            do {
                genCoords = [rand(trackSize-2,1,{round:true}),rand(trackSize-2,1,{round:true})];
                while (track[genCoords[1]][genCoords[0]] !== 0) {
                    genCoords = [rand(trackSize-2,1,{round:true}),rand(trackSize-2,1,{round:true})];
                }
                track[genCoords[1]][genCoords[0]] = 99;
                checkpoints.push([genCoords[1],genCoords[0]]);
                path = findPath(JSON.parse(JSON.stringify(track)), checkpoints[0], genCoords);
                if (!path) {
                    track[genCoords[1]][genCoords[0]] = 0;
                    checkpoints.pop();
                }
            } while (!path);
        };

        let path = findPath(JSON.parse(JSON.stringify(track)), checkpoints[checkpoints.length - 1], checkpoints[0]);
        if (!path) {
            console.log("The track cannot loop back to the first checkpoint.");
        } else {
            console.log("The track can loop back to the first checkpoint.");
        }

        console.log("Checkpoints:", checkpoints);

        

        console.table(track);

        const body = document.querySelector( '.block__centered' ),
            w = window.innerWidth,
            h = window.innerHeight,
            dpr = window.devicePixelRatio;

        // Remove existing canvas if it exists
        if (canvas) {
            body.removeChild(canvas);
        }

        canvas = document.createElement( 'canvas' );
        const ctx = canvas.getContext( '2d' );
        const realWidth = Math.round( w * 0.25 );
        const realHeight = realWidth;

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

        const cols = trackSize;
        const squareSize = realWidth / cols;
        const color = "black";


        const draw = () => {

            const trackMatrix = track.map(row => row.map(cell => {
                switch (cell) {
                    case 1: // Vertical path
                        return "/assets/images/vertical.svg";
                    case 2: // Horizontal path
                        return "/assets/images/horizontal.svg";
                    case 3: // Corner
                        return "/assets/images/corner.svg";
                    case 96:
                        return "/assets/images/vertical-start.svg";
                    case 97:
                        return "/assets/images/horizontal-start.svg";
                    case 98:
                        return "red";
                    case 99:
                        return "green";
                    default:
                        return "rgba(255, 255, 255, 0.0)";
                }
            }));

            ctx.fillStyle = color;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < cols; j++) {
                    let fillStyle = trackMatrix[i][j];
                    if (fillStyle.startsWith("/")) {
                        let img = new Image();
                        img.onload = function() {
                            ctx.drawImage(img, j * squareSize, i * squareSize, squareSize, squareSize);
                        };
                        img.src = fillStyle;
                        ctx.drawImage(img, j * squareSize, i * squareSize, squareSize, squareSize);
                    } else {
                        ctx.fillStyle = fillStyle;
                        ctx.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
                    }
                }
            }
        };

        canvasSetup();
        draw();
    }

    recalculate();

    regenerateTrackButton.addEventListener('click', recalculate);
    trackSizeSelect.addEventListener('change', recalculate);
    numCheckpointsSelect.addEventListener('change', recalculate);
});
