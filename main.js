const boxes = document.querySelectorAll('.box');
//boxes.forEach((box) => console.log(box.textContent));

//console.log(boxes[8].textContent === ''); // True

let currentPlayer = 'x';

function resetBoard() {
    boxes.forEach((box) => {
        box.textContent = '';
        box.style.color = 'white';
    });
    currentPlayer = 'x';
    // Reset the boxPressed function
    boxPressed = boxPressedFunc;
}

function boxPressedFunc(index) {
    // Only play if box is valid
    if(boxes[index].textContent === ''){
        boxes[index].textContent = currentPlayer;
        checkIfWinner();
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Change whose turn it is    
    }
}

// Initialize function; will be set to a null function when there is a winner
let boxPressed = boxPressedFunc;

function checkIfWinner() {
    console.clear();
    // Check for diagonal line wins
    if (boxes[0].textContent === currentPlayer &&
        boxes[4].textContent === currentPlayer &&
        boxes[8].textContent === currentPlayer) {
        winningLine([0,4,8]);
        //alert(`${currentPlayer} wins!`);
        return;
    }

    if (boxes[2].textContent === currentPlayer &&
        boxes[4].textContent === currentPlayer &&
        boxes[6].textContent === currentPlayer) { 
        winningLine([2,4,6])
        //alert(`${currentPlayer} wins!`);
        return;
    }

    // Check for horizontal line wins
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 3; j++) {
            let index = i + j;
            if (boxes[index].textContent !== currentPlayer) {
                break;
            }
            if (j === 2) {
                //alert(`${currentPlayer} wins!`);
                winningLine([i, i+1, i+2]);
                return;
            }
        }
    }

    // Check for vertical line wins
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j += 3) {
            let index = i + j;
            if (boxes[index].textContent !== currentPlayer) {
                break;
            }
            if (j === 6) {
                //alert(`${currentPlayer} wins!`);
                winningLine([i, i+3, i+6]);
                return;
            }
        }
    }
}

function winningLine(indexes){
    indexes.forEach((index) => boxes[index].style.color = 'green');
    // Set boxPressed to a null function, so that the box are not clickable anymores
    boxPressed = () => {};
}