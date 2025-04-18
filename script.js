function gameboard() {
  const board = [];

  const displayBoard = () => {
    for(let i = 0;i<9;i++){
      board[i] = '';
    }
  }

  const getBoard = () => board;

  const createPlayer = (userName, choice) => {
    return {userName,choice};
  }

  const winPatterns = [
    [0,1,2], // Rww
    [3,4,5],
    [6,7,8],
    [0,3,6], // Column 
    [1,4,7],
    [2,5,8],
    [0,4,8], // Diaglonal
    [2,4,6],
  ];

  const checkForWinner = (player) => {
    const marker = player.choice;
    for(const pattern of winPatterns){
      [pos1,pos2,pos3] = pattern;
      if([pos1,pos2,pos3].every(index => board[index] === marker)){
        console.log(`${player.userName} WON!`);
        return true;
      }
    }
  }

  const placeMarker = (index,player) => {
    if(board[index] === '') {
      board[index] = player.choice;
      return true;
    }
    return false;
  }

  const checkForDraw = () => {
    if(board.every((cell) => cell !== '' ) && !checkForWinner){
      console.log('Draw!');
    }
  }

  return {
    displayBoard,
    getBoard,
    createPlayer,
    winPatterns,
    checkForWinner,
    placeMarker,
    checkForDraw,
  };
}

function gameController(){
  const board = gameboard();
  const player1 = board.createPlayer('John', 'X');
  const player2 = board.createPlayer('Ryan','O');  

  const playRound = (index) => {
    /**
     * Handles a player's move when a cell is clicked.
     * - Checks if the selected cell is empty (successful placement)
     * - Updates the board with the current player's symbol
     * - Checks for a winner or a draw
     * - Switches to the next player
     */
    const successfulPlacement = board.placeMarker(index,currentPlayer);

    if(!successfulPlacement){
      console.log('Invalid Placement');
    } else {
      if(!board.checkForWinner(currentPlayer))
      switchTurn();
    }
  }

  let currentPlayer = player1;
  const switchTurn = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  const restartGame = () => {
    
  }

  board.displayBoard();

  playRound(0)

  board.checkForWinner(currentPlayer);
  board.checkForDraw();

  playRound(2);
  playRound(3);
  playRound(5);
  playRound(7);
  playRound(8);

  console.log(board.getBoard());

  return {
    switchTurn,
  }
}

gameController();
