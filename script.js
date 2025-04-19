function gameboard() {
  const board = [];
  const boardContainer = document.querySelector('.game-board');

  const displayBoard = () => {
    for(let i = 0;i<9;i++){
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;
      boardContainer.appendChild(cell);
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

  const checkForWinner = (currentPlayer) => {
    const marker = currentPlayer.choice;
    for(const pattern of winPatterns){
      [pos1,pos2,pos3] = pattern;
      if([pos1,pos2,pos3].every(index => board[index] === marker)){
        console.log(`${currentPlayer.userName} WON!`);
        return true;
      }
    }
    return false;
  }

  const placeMarker = (index,currentPlayer) => {
    if(board[index] === '') {
      board[index] = currentPlayer.choice;
      return true;
    }
    return false;
  }

  const checkForDraw = (currentPlayer) => {
    return board.every((cell) => cell !== '' ) && !checkForWinner(currentPlayer);
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
  board.displayBoard();

  const player1 = board.createPlayer('Player X', 'X');
  const player2 = board.createPlayer('Player O','O');  

  const playRound = (index) => {
    const successfulPlacement = board.placeMarker(index,currentPlayer);

    if(!successfulPlacement){
      console.log('Invalid Placement');
    } else{
      const isWin = board.checkForWinner(currentPlayer);
      const isDraw = board.checkForDraw(currentPlayer);

      if(!isWin) {
        switchTurn();
      }

      if(isDraw){
        console.log('Draw!');
      }
    }
  }

  let currentPlayer = player1;
  const switchTurn = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }

  // const restartGame = () => {
  //   board.displayBoard();
  // }

  return {
    switchTurn,
    playRound,
  }
}

gameController();
