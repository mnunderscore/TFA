//TODO: translate checkpoints as part of track

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
var canvas = null;

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

        function arraysEqual(a, b) {
            return a.length === b.length && a.every((val, index) => val === b[index]);
        }

        function findPath(track, start, end, endPoints = new Set()) {
            const queue = [[start, []]];
            const visited = new Set();

            while (queue.length > 0) {
                const [checkpoint, path] = queue.shift();

                if (arraysEqual(checkpoint, end)) {
                    return path.concat([end]);
                }

                visited.add(checkpoint.toString());

                const neighbors = [
                    [checkpoint[0] - 1, checkpoint[1]],
                    [checkpoint[0] + 1, checkpoint[1]],
                    [checkpoint[0], checkpoint[1] - 1],
                    [checkpoint[0], checkpoint[1] + 1]
                ];

                for (const neighbor of neighbors) {
                    const [i, j] = neighbor;

                    if (i >= 0 && i < track.length && j >= 0 && j < track[0].length &&
                        !visited.has(neighbor.toString()) &&
                        (track[i][j] === 0 || (track[i][j] === 99 && endPoints.has(neighbor.toString())) || arraysEqual(neighbor, end))) {
                        queue.push([neighbor, path.concat([checkpoint])]);
                    }
                }
            }

            return null;
        }

        function calculateClosestCheckpoint() {
            let path = [];
            let checkpointsCopy = checkpoints.slice();
            let currentCheckpoint = checkpointsCopy[0];
            let firstCheckpoint = currentCheckpoint;
            path.push(currentCheckpoint);

            let endPoints = new Set(checkpointsCopy.map(checkpoint => checkpoint.toString()));

            while (checkpointsCopy.length > 1) {
                let closestDistance = Infinity;
                let closestCheckpointIndex;

                for (let i = 1; i < checkpointsCopy.length; i++) {
                    let curr = checkpointsCopy[i];
                    let distance = Math.sqrt(Math.pow(curr[0] - currentCheckpoint[0], 2) + Math.pow(curr[1] - currentCheckpoint[1], 2));

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestCheckpointIndex = i;
                    }
                }

                currentCheckpoint = checkpointsCopy[closestCheckpointIndex];
                path.push(currentCheckpoint);
                checkpointsCopy.splice(closestCheckpointIndex, 1);
                endPoints.delete(currentCheckpoint.toString());
            }

            path.push(firstCheckpoint);

            return path;
        }

        function findPaths(track, closestCheckpointPath) {
            let paths = [];

            for (let i = 0; i < closestCheckpointPath.length - 1; i++) {
                let start = closestCheckpointPath[i];
                let end = closestCheckpointPath[i + 1];
                let path = findPath(track, start, end);

                if (path) {
                    console.log('Path:', path);

                    paths.push(path);
                    for (let j = 1; j < path.length - 1; j++) {
                        let prev = path[j - 1];
                        let curr = path[j];
                        let next = path[j + 1];

                        let [x, y] = curr;
                        if (track[x][y] === 0 ) {
                            if (prev[0] === curr[0] && curr[0] === next[0]) {

                                track[x][y] = 2;
                            } else if (prev[1] === curr[1] && curr[1] === next[1]) {

                                track[x][y] = 1;
                            } else {

                                if ((prev[0] < curr[0] && curr[1] < next[1]) || (prev[1] > curr[1] && curr[0] > next[0])) {
                                    track[x][y] = 6;
                                } else if ((prev[1] > curr[1] && curr[0] < next[0]) || (prev[0] > curr[0] && curr[1] < next[1])) {
                                    track[x][y] = 3;
                                } else if ((prev[0] < curr[0] && curr[1] > next[1]) || (prev[1] < curr[1] && curr[0] > next[0])) {
                                    track[x][y] = 5;
                                } else if ((prev[1] < curr[1] && curr[0] < next[0]) || (prev[0] > curr[0] && curr[1] > next[1])) {
                                    track[x][y] = 4;
                                } else {
                                    console.error('Invalid corner', {prev, curr, next});
                                }
                            }
                        }
                    }
                }
            }

            return paths;
        }

        function placeStart(track, paths) {
            let potentialCells = [];

            paths.forEach(path => {
                for (let i = 1; i < path.length - 1; i++) {
                    let prev = path[i - 1];
                    let curr = path[i];
                    let next = path[i + 1];

                    if (prev[0] === curr[0] && curr[0] === next[0]) {
                        potentialCells.push({ cell: curr, alignment: 'vertical' });
                    } else if (prev[1] === curr[1] && curr[1] === next[1]) {
                        potentialCells.push({ cell: curr, alignment: 'horizontal' });
                    }
                }
            });

            if (potentialCells.length > 0) {
                let randomCell = getRandomElement(potentialCells);
                track[randomCell.cell[0]][randomCell.cell[1]] = randomCell.alignment === 'vertical' ? 97 : 96;
            }
        }

        let closestCheckpointPath = calculateClosestCheckpoint();
        let paths = findPaths(track, closestCheckpointPath);
        placeStart(track, paths);

        console.table(track);

        const body = document.querySelector( '.block__centered' ),
            w = window.innerWidth,
            h = window.innerHeight,
            dpr = window.devicePixelRatio;


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
                    case 1:
                        return {src: "/assets/images/straight.svg", rotation: 0};
                    case 2:
                        return {src: "/assets/images/straight.svg", rotation: Math.PI/2};
                    case 3:
                        return {src: "/assets/images/corner.svg", rotation: 0};
                    case 4:
                        return {src: "/assets/images/corner.svg", rotation: Math.PI/2};
                    case 5:
                        return {src: "/assets/images/corner.svg", rotation: Math.PI};
                    case 6:
                        return {src: "/assets/images/corner.svg", rotation: 3*Math.PI/2};
                    case 96:
                        return {src: "/assets/images/start.svg", rotation: 0};
                    case 97:
                        return {src: "/assets/images/start.svg", rotation: Math.PI/2};
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
                    if (typeof fillStyle === 'object') {
                        let img = new Image();
                        img.onload = function() {
                            ctx.save();
                            ctx.translate(j * squareSize + squareSize / 2, i * squareSize + squareSize / 2);
                            ctx.rotate(fillStyle.rotation);
                            ctx.drawImage(img, -squareSize / 2, -squareSize / 2, squareSize, squareSize);
                            ctx.restore();
                        };
                        img.src = fillStyle.src;
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
