class Board {
    constructor(htmlElementList) {
        this.htmlElementList = htmlElementList;
        this.grid = [['','',''],['','',''],['','','']]; // 2d 3x3 Array
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.grid[i][j] = htmlElementList[i * 3 + j].textContent;
            }
        }
    }

    display() {
        console.log(this.grid);
    }

    // Return value on the board at the specified coordinates
    getValue(i,j){
        return this.grid[i][j];
    }

    playMove(i, j) {
        this.htmlElementList[i * 3 + j].textContent = currentPlayer;
        this.grid[i][j] = currentPlayer;

        let win = this.checkIfWinner();
        if(win !== -1){ // There is a winner
            winningLine(win);
        } else { // No winner
            currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Change whose turn it is
            if(currentPlayer === 'o') aiTurn();
        }
    }

    // Function called when "Play again!" button is pressed
    reset() {
        this.htmlElementList.forEach((box) => {
            box.textContent = '';
            box.style.color = 'white';
        })

        this.grid = [['','',''],['','',''],['','','']];
    }

    checkIfWinner() {
        // Check for diagonal line wins
        if (this.getValue(0,0) === currentPlayer &&
            this.getValue(1,1) === currentPlayer &&
            this.getValue(2,2) === currentPlayer) {
            //alert(`${currentPlayer} wins!`);
            return [[0,0],[1,1],[2,2]];
        }
    
        if (this.getValue(0,2) === currentPlayer &&
            this.getValue(1,1) === currentPlayer &&
            this.getValue(2,0) === currentPlayer) { 
            //alert(`${currentPlayer} wins!`);
            return [[0,2],[1,1],[2,0]];
        }
    
        // Check for horizontal line wins
        for (let i = 0; i < 3; i ++) {
            for (let j = 0; j < 3; j++) {
                if (this.getValue(i,j) !== currentPlayer) {
                    break;
                }
                if (j === 2) {
                    //alert(`${currentPlayer} wins!`);
                    return [[i,0],[i,1],[i,2]];
                }
            }
        }
    
        // Check for vertical line wins
        for (let j=0; j<3; j++) {
            for (let i=0; i<3; i++) {
                if (this.getValue(i,j) !== currentPlayer) {
                    break;
                }
                if (i === 2) {
                    //alert(`${currentPlayer} wins!`);
                    return [[0,j],[1,j],[2,j]];
                }
            }
        }
    
        return -1; // Not a winning move
    }
}