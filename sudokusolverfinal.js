var puzzleStr = "000123000000405000001000500320000067800000009960000024006000700000904000000837000";
const ROW = 9;
const COL = 9;

// Changes a string to an array of 9 arrays, representing the individual rows of the puzzle
function board (puzzleStr){
    var board = [];
    var puzzleRow = [];
    
    for (let j = 0; j < puzzleStr.length; j += ROW){
        // Iterate through 9 digits - forms 1 row
        for (let k = 0; k < COL; k++){
            puzzleRow.push(puzzleStr[j+k]);
        }
        board.push(puzzleRow);
        puzzleRow = [];
    }
    return board;
}
board = board(puzzleStr);
// console.log(board);


// Check if board is solved; returns true if numZeroes = 0, i.e., solved
function solvedBoard(board){
    let numZeroes = 0;

    board.forEach(element => {
        element.forEach(cell =>{
            if (cell == "0"){
                numZeroes++;
            }
        })
    });
            
    if (numZeroes == 0){
        return true;
    }
    return false;
};                        
        

// Check if digit exists in row row
function numExistsRow(digit, row){
    // Iterates through the rows to compare digits
    for (let c = 0; c < COL; c++){
        // Returns true if digit already exists in row row
        if (digit == board[row][c]){
            return true;
        };
    };
    return false;
};    
// Digit 3 at row 0
// console.log("3 @ row 0, expects true: " + numExistsRow(3, 0));


// Check if digit exists in column col
function numExistsCol(digit, col){
    // Iterates through the column to compare digits
    for (let r = 0; r < ROW; r++)
    {
        // Returns true if digit already exists in column col
        if (digit == board[r][col]){
            return true;
        }
    }
    return false;
}
// Digit 7 at col 3, true
// console.log("7 @ col 3, expects true: " + numExistsCol(7, 3));  


// Check if digit exists in block
// Always start checking from row/col (Math.floor(row/col/3) * 3)
function numExistsBlock(digit, row, col){
    gridRow = Math.floor(row/3) * 3;
    gridCol = Math.floor(col/3) * 3;
    for (let x = gridRow; x < (gridRow + 3); x++){
        for (let y = gridCol; y < (gridCol + 3); y++){
            if (digit == board[x][y]){
                return true;
            }
        }
    }
    return false;
}
// console.log("8 @ row 7, col 2, expects true: " + numExistsBlock(8, 7, 2));


// Returns true if number does not exist in row, col & block
function isSafe(digit, row, col){
    if (numExistsRow(digit, row) == false 
     && numExistsCol(digit, col) == false 
     && numExistsBlock(digit, row, col) == false){
        return true;
    }
    return false;
}
// console.log("2 @ row 0, col 0, expects true: " + isSafe(2, 0, 0));


function solveBoard(board){
    
    // Base case - exit if board is solved
    if (solvedBoard(board)){
        return true;
    };
    
    for (let row = 0; row < board.length; row++){
        for (let col = 0; col < board[row].length; col++){
            // Only attempts to solve if spot is 0
            if (board[row][col] == "0"){
                for (let t = 1; t <= 9; t++){
                    if (isSafe(t, row, col)){
                        // Assign tentatively
                        board[row][col] = t;

                        // Try to solve again using this new configuration
                        if (solveBoard(board)){
                            return true;
                        }

                        // If the configuration does not work, reassign to "0"
                        // Try again with the next number
                        board[row][col] = "0";
                    };
                };
                // If tried all the numbers 1 - 9 and puzzle still not solved, return false - triggers backtracking
                return false;
            };
        };
    };
};

console.log("did i solve " + solveBoard(board));
console.log(board);