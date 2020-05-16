const ai = 'o';
const player = 'x';


let scoreTable = {
    aiWin: 1,
    tie: 0,
    playerWin: -1
}

function minimax() {
    let optimalMove;
    // AI wants to maximize the score
    let maxScore = -Infinity;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.getValue(i, j) === '') {
                // Simulate a move to the found empty slot
                board.setInGrid(ai, i, j);
                // Simulate a player that plays optimaly and get the minimized score
                let score = playerTurn();
                if (maxScore < score) {
                    // A more optimal move has been found by the AI
                    optimalMove = { i, j };
                    maxScore = score;
                }
                board.undo(i, j);
            }
        }
    }
    // Play the optimal move found
    board.playMove(optimalMove.i, optimalMove.j);
}

function playerTurn() {
    // The simulated played plays optimally, so it wants to minimize the score
    let minScore = Infinity;
    let score;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.getValue(i, j) === '') {
                board.setInGrid(player, i, j);
                let win = board.checkIfWinner(player);
                if (win === 0) { // There is a tie
                    score = scoreTable.tie;
                } else if (win === -1) { // Not a winning move
                    score = aiTurn();
                } else {
                    board.undo(i, j);
                    return scoreTable.playerWin; // TODO: Could just stop iterating right there USE DEPTH
                }
                board.undo(i, j);
                minScore = Math.min(score, minScore);
            }
        }
    }
    return minScore;
}

function aiTurn() {
    // AI wants to maximize the score
    let maxScore = -Infinity;
    let score;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.getValue(i, j) === '') {
                board.setInGrid(ai, i, j);
                let win = board.checkIfWinner(ai);
                if (win === 0) {
                    score = scoreTable.tie;
                } else if (win === -1) {
                    score = playerTurn();
                } else {
                    board.undo(i, j);
                    return scoreTable.aiWin;
                }
                board.undo(i, j);
                maxScore = Math.max(score, maxScore);
            }
        }
    }
    return maxScore;
}