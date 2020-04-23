// All code should be written in this file.
let playerOneMoveOneType;
let playerOneMoveOneValue;
let playerOneMoveTwoType;
let playerOneMoveTwoValue;
let playerOneMoveThreeType;
let playerOneMoveThreeValue;
let playerTwoMoveOneType;
let playerTwoMoveOneValue;
let playerTwoMoveTwoType;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeType;
let playerTwoMoveThreeValue;

const isMoveTypeValid = (moveType) => {
    return (moveType === 'rock' || moveType === 'paper' || moveType === 'scissors')
};

const areMoveValuesValid = (moveOneValue, moveTwoValue, moveThreeValue) => {
    return (moveOneValue >= 1 &&
        moveTwoValue >= 1 &&
        moveThreeValue >= 1 &&
        moveOneValue + moveTwoValue + moveThreeValue <= 99);
};

const setPlayerMoves = (player,
    moveOneType, moveOneValue,
    moveTwoType, moveTwoValue,
    moveThreeType, moveThreeValue) => {
    if (isMoveTypeValid(moveOneType) && isMoveTypeValid(moveTwoType) && isMoveTypeValid(moveThreeType) &&
    areMoveValuesValid(moveOneValue, moveTwoValue, moveThreeValue)) {
        if (player === 'Player One') {
            playerOneMoveOneType = moveOneType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveThreeValue = moveThreeValue;
        } else if (player === 'Player Two') {
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveThreeValue = moveThreeValue;
        }
    }
};

const getRoundWinner = (roundNumber) => {
    let playerOneMoveType;
    let playerTwoMoveType;
    let playerOneMoveValue;
    let playerTwoMoveValue;

    switch (roundNumber) {
        case 1:
            playerOneMoveType = playerOneMoveOneType;
            playerTwoMoveType = playerTwoMoveOneType;
            playerOneMoveValue = playerOneMoveOneValue;
            playerTwoMoveValue = playerTwoMoveOneValue;
            break;
        case 2:
            playerOneMoveType = playerOneMoveTwoType;
            playerTwoMoveType = playerTwoMoveTwoType;
            playerOneMoveValue = playerOneMoveTwoValue;
            playerTwoMoveValue = playerTwoMoveTwoValue;
            break;
        case 3:
            playerOneMoveType = playerOneMoveThreeType;
            playerTwoMoveType = playerTwoMoveThreeType;
            playerOneMoveValue = playerOneMoveThreeValue;
            playerTwoMoveValue = playerTwoMoveThreeValue;
            break ;
        default:
            return null;
    }

    if (playerOneMoveType === undefined || playerTwoMoveType === undefined || playerOneMoveValue === undefined || playerTwoMoveValue === undefined) {
        return null;
    }

    if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue === playerTwoMoveValue) {
            return 'Tie';
        } else if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'rock') {
        if (playerTwoMoveType === 'scissors') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'paper') {
        if (playerTwoMoveType === 'rock') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    } else if (playerOneMoveType === 'scissors') {
        if (playerTwoMoveType === 'paper') {
            return 'Player One';
        } else {
            return 'Player Two';
        }
    }
};

const getGameWinner = () => {
    let roundsWonByPlayerOne = 0;
    let roundsWonByPlayerTwo = 0;
    let isGameValid = true;

    for (let i = 0; i < 3; i++) {
        switch (getRoundWinner(i + 1)) {
            case 'Tie':
                break;
            case 'Player One':
                roundsWonByPlayerOne++;
                break;
            case 'Player Two':
                roundsWonByPlayerTwo++;
                break;
            default:
                isGameValid = false;
                return null;
        }
    }

    if (roundsWonByPlayerOne === roundsWonByPlayerTwo) {
        return 'Tie';
    } else if (roundsWonByPlayerOne > roundsWonByPlayerTwo) {
        return 'Player One';
    } else if (roundsWonByPlayerOne < roundsWonByPlayerTwo) {
        return 'Player Two';
    }
};

const getRandomMoveType = () => {
    let randomNumber = Math.floor(Math.random() * 3);

    switch (randomNumber) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}

const getRandomMoveValue = (previousValue) => {
    const randomNumber = Math.floor(Math.random() * (99 - previousValue)) + 1;
    return randomNumber;
} 

const setComputerMoves = () => {
    playerTwoMoveOneType = getRandomMoveType();
    playerTwoMoveOneValue = Math.floor(Math.random() * 97) + 1;
    playerTwoMoveTwoType = getRandomMoveType();
    playerTwoMoveTwoValue = Math.floor(Math.random() * 98 - playerTwoMoveOneValue) + 1;
    playerTwoMoveThreeType = getRandomMoveType();
    playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;
}