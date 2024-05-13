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

const directions = ['left','right','up','down']
const startDirection = directions[rand(3,0,{round:true})];
const whereGoing = startDirection;
const lastDirection = startDirection;
const startPosition = [rand(8,1,{round:true}),rand(8,1,{round:true})]
const currentPosition = startPosition;
const lastPosition = startPosition;

if (startDirection === 'left' || startDirection === 'right') {
    track[startPosition[0]][startPosition[1]] = 10;
} else {
    track[startPosition[0]][startPosition[1]] = 11;
}

console.table(track);

console.log('startDirection:' + startDirection);
console.log('startPosition:' + startPosition);
console.log('whereGoing:' + whereGoing);

switch (whereGoing) {
    case 'left':
        currentPosition[1] -= 1;
        break;
    case 'right':
        currentPosition[1] += 1;
        break;
    case 'up':
        currentPosition[0] -= 1;
        break;
    case 'down':
        currentPosition[0] += 1;
        break;
}

if(lastDirection === 'left' && whereGoing === 'left') {
    track[currentPosition[0]][currentPosition[1]] = 1;
} else if (lastDirection === 'right' && whereGoing === 'right') {
    track[currentPosition[0]][currentPosition[1]] = 1;
} else if (lastDirection === 'up' && whereGoing === 'up') {
    track[currentPosition[0]][currentPosition[1]] = 2;
} else if (lastDirection === 'down' && whereGoing === 'down') {
    track[currentPosition[0]][currentPosition[1]] = 2;
} else if (lastDirection === 'down' && whereGoing === 'right') {
    track[currentPosition[0]][currentPosition[1]] = 3;
} else if (lastDirection === 'down' && whereGoing === 'left') {
    track[currentPosition[0]][currentPosition[1]] = 4;
} else if (lastDirection === 'up' && whereGoing === 'right') {
    track[currentPosition[0]][currentPosition[1]] = 5;
} else if (lastDirection === 'up' && whereGoing === 'left') {
    track[currentPosition[0]][currentPosition[1]] = 6;
};


for (let i = 0; i < 5; i++) {
    let whereGoing;

    do {
        if (currentPosition[1] == 0) {
            whereGoing = directions[rand(3,2,{round:true})];
        } else if (currentPosition[1] == 9) {
            whereGoing = directions[rand(3,2,{round:true})];
        } else if (currentPosition[0] == 0) {
            whereGoing = directions[rand(1,0,{round:true})];
        } else if (currentPosition[0] == 9) {
            whereGoing = directions[rand(1,0,{round:true})];
        } else {
            whereGoing = directions[rand(3,0,{round:true})];
        }

        switch (whereGoing) {
            case 'left':
                currentPosition[1] -= 1;
                break;
            case 'right':
                currentPosition[1] += 1;
                break;
            case 'up':
                currentPosition[0] -= 1;
                break;
            case 'down':
                currentPosition[0] += 1;
                break;
        }
    } while (track[currentPosition[0]][currentPosition[1]] !== 0);

    // 1 = horizontal
    // 2 = vertical
    // 3 = bas vers droite
    // 4 = bas vers gauche
    // 5 = haut vers droite
    // 6 = haut vers gauche

    if(lastDirection === 'left' && whereGoing === 'left') {
        track[currentPosition[0]][currentPosition[1]] = 1;
    } else if (lastDirection === 'right' && whereGoing === 'right') {
        track[currentPosition[0]][currentPosition[1]] = 1;
    } else if (lastDirection === 'up' && whereGoing === 'up') {
        track[currentPosition[0]][currentPosition[1]] = 2;
    } else if (lastDirection === 'down' && whereGoing === 'down') {
        track[currentPosition[0]][currentPosition[1]] = 2;
    } else if (lastDirection === 'down' && whereGoing === 'right') {
        track[currentPosition[0]][currentPosition[1]] = 3;
    } else if (lastDirection === 'down' && whereGoing === 'left') {
        track[currentPosition[0]][currentPosition[1]] = 4;
    } else if (lastDirection === 'up' && whereGoing === 'right') {
        track[currentPosition[0]][currentPosition[1]] = 5;
    } else if (lastDirection === 'up' && whereGoing === 'left') {
        track[currentPosition[0]][currentPosition[1]] = 6;
    };

    const lastPosition = currentPosition;
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

        ctx.scale( dpr, dpr );

        canvas.style.transform = "rotate(45deg)";
        canvas.style.webkitTransform = "rotate(45deg)";

        body.appendChild( canvas );
    };

    const cols = 10;
    const squareSize = realWidth / cols;
    const color = "red";


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
                default:
                    return "white";
            }
        }));

        ctx.fillStyle = color;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < cols; j++) {
                ctx.fillStyle = trackMatrix[i][j];
                ctx.fillRect(i * squareSize, j * squareSize, squareSize, squareSize);
            }
        }
    };

    canvasSetup();
    draw();
});
