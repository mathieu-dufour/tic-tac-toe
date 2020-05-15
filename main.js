// Get content of all boxed from tic tac toe grid and generate board from it
const board = new Board(document.querySelectorAll('.box'));

// From the rules of tic tac toe, the player who plays first is always 'x'
let currentPlayer = 'x';

// Function called when "Play again!" button is pressed
function resetBoard() {
    board.reset();
    currentPlayer = 'x';
    boxPressed = boxPressedFunc; // Reset the boxPressed function
}

// Called when someone plays a move
function boxPressedFunc(i, j) {
    // Only play if box is valid
    if (board.getValue(i, j) === '') {
        board.playMove(i, j);
    }
}

// Initialize function; will be set to a null function when there is a winner
let boxPressed = boxPressedFunc;

// Color the winning line in green
function winningLine(coordinatesList) {
    // For each [i,j] coordinate in the board, change the color to green
    coordinatesList.forEach(function (coordinates) {
        let i = coordinates[0];
        let j = coordinates[1];
        board.htmlElementList[i*3+j].style.color = 'green';
    });

    // Set boxPressed to a null function, so that the box are not clickable anymores
    boxPressed = () => { };
}