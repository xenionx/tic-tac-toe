
const playerDisplay = document.querySelector(".player-turn")
const restartButton = document.querySelector(".btn")

const gameBoard = (() => {
    const boardCell = document.querySelectorAll(".cell");
    const cellArray = Array.from(boardCell);
    let boardCells = ['', '', '', '', '', '', '', '', ''];
    const render = () => {
        cellArray.forEach((cell) => {
            cell.textContent = boardCells[cellArray.indexOf(cell)]
        } );
    }
    restartButton.addEventListener('click', () => {
        boardCells.forEach((cell) => {
            boardCells[boardCells.indexOf(cell)] = "";
            render();
       })
    })
    cellArray.forEach((cell) => {
        cell.addEventListener("click", () => {
            if(boardCells[cellArray.indexOf(cell)] == "" && !checkWinner().winnerFound){
                if(player1.getTurn()){
                    boardCells[cellArray.indexOf(cell)] = "X";
                    playerDisplay.textContent = "Player O's Turn";
                }else if(player2.getTurn() && boardCells[cellArray.indexOf(cell)] == ""){
                    boardCells[cellArray.indexOf(cell)] = "O";
                    playerDisplay.textContent = "Player X's Turn";
                }
                player1.switchTurn();
                player2.switchTurn();
                render();
                checkWinner();
            }
        })
    })

    const getBoardCell = () => {
        return boardCells;
    }
    return {render, getBoardCell}
})();

const Player = (turn) =>{
    let playerTurn = turn;
    const switchTurn = () => {
        playerTurn = !playerTurn;
    }
    const getTurn = () => {
        return playerTurn;
    }
    return{switchTurn, getTurn};
};

const checkWinner = () =>{
    let winnerFound = false;
    const indexes = {
        firstColumnIndex :  [0, 3, 6],
        secondColumnIndex :  [1, 4, 7],
        thirdColumnIndex :  [2, 5, 8],
        firstDiagonalIndex :  [0, 4, 8],
        secondDiagonalIndex : [6, 4, 2 ]
    }

    const rows = {
        firstRow : (gameBoard.getBoardCell().slice(0, 3)),
        secondRow : (gameBoard.getBoardCell().slice(3, 6)),
        thirdRow : (gameBoard.getBoardCell().slice(6, 10))
    }

    const columns = {
        firstColumn : indexes.firstColumnIndex.map(index => gameBoard.getBoardCell()[index]),
        secondColumn : indexes.secondColumnIndex.map(index => gameBoard.getBoardCell()[index]),
        thirdColumn : indexes.thirdColumnIndex.map(index => gameBoard.getBoardCell()[index])
    }

    const diagonals = {
        firstDiagonal : indexes.firstDiagonalIndex.map(index => gameBoard.getBoardCell()[index]),
        secondDiagonal : indexes.secondDiagonalIndex.map(index => gameBoard.getBoardCell()[index])
    }   

    const checkElementX = (index) => {
        return index == "X";
    }

    const checkElementO = (index) => {
        return index == "O";
    }

    const checkDraw = (index) => {
        return (index == 'X' || index == 'O');
    }

    if  (rows.firstRow.every(checkElementX) ||
         rows.secondRow.every(checkElementX) || 
         rows.thirdRow.every(checkElementX) ||
         columns.firstColumn.every(checkElementX) ||
         columns.secondColumn.every(checkElementX) ||
         columns.thirdColumn.every(checkElementX) ||
         diagonals.firstDiagonal.every(checkElementX) ||
         diagonals.firstDiagonal.every(checkElementX)
    ){
        winnerFound = true;
        playerDisplay.textContent = "Player X has won the game!"
    }
    else if (rows.firstRow.every(checkElementO) ||
            rows.secondRow.every(checkElementO) || 
            rows.thirdRow.every(checkElementO) ||
            columns.firstColumn.every(checkElementO) ||
            columns.secondColumn.every(checkElementO) ||
            columns.thirdColumn.every(checkElementO) ||
            diagonals.firstDiagonal.every(checkElementO) ||
            diagonals.secondDiagonal.every(checkElementO))
        {
         winnerFound = true;
         playerDisplay.textContent = "Player O has won the game!"
        }
    else if (gameBoard.getBoardCell().every(checkDraw) && !winnerFound){
        playerDisplay.textContent = "It's a DRAW!";
    }
    return{winnerFound}
}







const player1 = Player(true);
const player2 = Player(false);




