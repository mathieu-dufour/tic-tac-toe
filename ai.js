function aiTurn() {

    let emptySlot = getNextAvailable();
    let i = emptySlot[0];
    let j = emptySlot[1];
    board.playMove(i, j);
}

function getNextAvailable() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.getValue(i, j) === '') {
                return [i, j];//First available slot, reading from left to right, top-down
            }
        }
    }

    // All board is full
    return -1;
}