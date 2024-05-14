const directions = ['left','right','up','down']
const startDirection = directions[rand(3,0,{round:true})];
let whereGoing = startDirection;
let lastDirection = startDirection;
const startPosition = [rand(8,1,{round:true}),rand(8,1,{round:true})]
let currentPosition = startPosition;
let lastPosition = startPosition;

if (startDirection === 'left' || startDirection === 'right') {
    track[startPosition[1]][startPosition[0]] = 10;
} else {
    track[startPosition[1]][startPosition[0]] = 11;
}

console.table(track);

console.log('startDirection:' + startDirection);
console.log('startPosition:' + startPosition);
console.log('whereGoing:' + whereGoing);

let possiblePosition = currentPosition;

do {
    possiblePosition = currentPosition;
    if (currentPosition[0] == 0) {
        whereGoing = directions[rand(3,2,{round:true})];
    } else if (currentPosition[0] == 9) {
        whereGoing = directions[rand(3,2,{round:true})];
    } else if (currentPosition[1] == 0) {
        whereGoing = directions[rand(1,0,{round:true})];
    } else if (currentPosition[1] == 9) {
        whereGoing = directions[rand(1,0,{round:true})];
    }

    switch (whereGoing) {
        case 'left':
            possiblePosition[0] = (currentPosition[0] - 1);
            break;
        case 'right':
            possiblePosition[0] = (currentPosition[0] + 1);
            break;
        case 'up':
            possiblePosition[1] = (currentPosition[1] - 1);
            break;
        case 'down':
            possiblePosition[1] = (currentPosition[1] + 1);
            break;
    }

    console.log('possiblePosition:' + possiblePosition);

} while (track[possiblePosition[1]][possiblePosition[0]] !== 0);

if(lastDirection === 'left' && whereGoing === 'left') {
    track[currentPosition[1]][currentPosition[0]] = 1;
} else if (lastDirection === 'left' && whereGoing === 'up') {
    track[currentPosition[1]][currentPosition[0]] = 5;
} else if (lastDirection === 'left' && whereGoing === 'down') {
    track[currentPosition[1]][currentPosition[0]] = 3;
} else if (lastDirection === 'right' && whereGoing === 'right') {
    track[currentPosition[1]][currentPosition[0]] = 1;
} else if (lastDirection === 'right' && whereGoing === 'up') {
    track[currentPosition[1]][currentPosition[0]] = 6;
} else if (lastDirection === 'right' && whereGoing === 'down') {
    track[currentPosition[1]][currentPosition[0]] = 4;
} else if (lastDirection === 'up' && whereGoing === 'up') {
    track[currentPosition[1]][currentPosition[0]] = 2;
} else if (lastDirection === 'up' && whereGoing === 'right') {
    track[currentPosition[1]][currentPosition[0]] = 3;
} else if (lastDirection === 'up' && whereGoing === 'left') {
    track[currentPosition[1]][currentPosition[0]] = 4;
} else if (lastDirection === 'down' && whereGoing === 'down') {
    track[currentPosition[1]][currentPosition[0]] = 2;
} else if (lastDirection === 'down' && whereGoing === 'right') {
    track[currentPosition[1]][currentPosition[0]] = 5;
} else if (lastDirection === 'down' && whereGoing === 'left') {
    track[currentPosition[1]][currentPosition[0]] = 6;
};

lastDirection = whereGoing;

console.log('lastDirection:' + lastDirection)

console.log('------------GOING INTO FOR------------');



for (let i = 0; i < 5; i++) {

    do {
        possiblePosition = currentPosition;
        if (currentPosition[0] == 0) {
            whereGoing = directions[rand(3,2,{round:true})];
        } else if (currentPosition[0] == 9) {
            whereGoing = directions[rand(3,2,{round:true})];
        } else if (currentPosition[1] == 0) {
            whereGoing = directions[rand(1,0,{round:true})];
        } else if (currentPosition[1] == 9) {
            whereGoing = directions[rand(1,0,{round:true})];
        } else {
            whereGoing = directions[rand(3,0,{round:true})];
        }

        switch (whereGoing) {
            case 'left':
                possiblePosition[0] = (currentPosition[0] - 1);
                break;
            case 'right':
                possiblePosition[0] = (currentPosition[0] + 1);
                break;
            case 'up':
                possiblePosition[1] = (currentPosition[1] - 1);
                break;
            case 'down':
                possiblePosition[1] = (currentPosition[1] + 1);
                break;
        };

    } while (track[possiblePosition[1]][possiblePosition[0]] !== 0);

    console.log('whereGoing:' + whereGoing);
    console.log('currentPosition:' + currentPosition);

    // 1 = horizontal
    // 2 = vertical
    // 3 = down to right
    // 4 = down to left
    // 5 = up to right
    // 6 = up to left

    console.log('lastDirection:' + lastDirection);

    if(lastDirection === 'left' && whereGoing === 'left') {
        track[currentPosition[1]][currentPosition[0]] = 1;
    } else if (lastDirection === 'left' && whereGoing === 'up') {
        track[currentPosition[1]][currentPosition[0]] = 5;
    } else if (lastDirection === 'left' && whereGoing === 'down') {
        track[currentPosition[1]][currentPosition[0]] = 3;
    } else if (lastDirection === 'right' && whereGoing === 'right') {
        track[currentPosition[1]][currentPosition[0]] = 1;
    } else if (lastDirection === 'right' && whereGoing === 'up') {
        track[currentPosition[1]][currentPosition[0]] = 6;
    } else if (lastDirection === 'right' && whereGoing === 'down') {
        track[currentPosition[1]][currentPosition[0]] = 4;
    } else if (lastDirection === 'up' && whereGoing === 'up') {
        track[currentPosition[1]][currentPosition[0]] = 2;
    } else if (lastDirection === 'up' && whereGoing === 'right') {
        track[currentPosition[1]][currentPosition[0]] = 3;
    } else if (lastDirection === 'up' && whereGoing === 'left') {
        track[currentPosition[1]][currentPosition[0]] = 4;
    } else if (lastDirection === 'down' && whereGoing === 'down') {
        track[currentPosition[1]][currentPosition[0]] = 2;
    } else if (lastDirection === 'down' && whereGoing === 'right') {
        track[currentPosition[1]][currentPosition[0]] = 5;
    } else if (lastDirection === 'down' && whereGoing === 'left') {
        track[currentPosition[1]][currentPosition[0]] = 6;
    };

    lastDirection = whereGoing;

    console.log('-----------END-----------');
};