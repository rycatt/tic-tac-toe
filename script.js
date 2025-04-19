const resultMsg = document.querySelector('.result-message');
const currentMarker = document.querySelector('.current-marker');
let gameOver = false;

function gameboard() {
  const board = []
  const boardContainer = document.querySelector('.game-board');

  const displayBoard = () => {
    for(let i = 0;i<9;i++){
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.cell = i;
      boardContainer.appendChild(cell);
      board.push('')
    }
  }

  const showWinningPatterns = (winningPattern, color='#a9dc76') => {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach((cell) => {
      const cellId = Number(cell.dataset.cell);
      if(winningPattern.includes(cellId)){
        cell.style.backgroundColor = color;
        cell.style.borderColor = color;
      }
    })
  }

  const getBoard = () => board;

  const createPlayer = (userName, choice) => {
    return {userName,choice};
  }

  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6], // Diagonals
  ];

  const checkForWinner = (currentPlayer) => {
    const marker = currentPlayer.choice;
    for(const pattern of winPatterns){
      [pos1,pos2,pos3] = pattern;
      if([pos1,pos2,pos3].every(index => board[index] === marker)){
        resultMsg.textContent = `${currentPlayer.userName} Won`;
        resultMsg.classList.add('show');
        showWinningPatterns(pattern);
        game.incrementScore(currentPlayer);
        gameOver = true;
      }
    }
  }

  const placeMarker = (index,currentPlayer) => {
    if(board[index] === '' && !gameOver) {
      board[index] = currentPlayer.choice;
      
      const cell = document.querySelector(`[data-cell="${index}"]`)
      if(cell){
        cell.textContent = currentPlayer.choice;
        cell.classList.add(currentPlayer.choice === 'X' ? 'player-x-marker' : 'player-o-marker'); 
      }

      return true;
    }
    return false;
  }

  const checkForDraw = () => {
    return board.every((cell) => cell !== '' ) && !gameOver;
  }

  return {
    displayBoard,
    getBoard,
    createPlayer,
    winPatterns,
    checkForWinner,
    placeMarker,
    checkForDraw,
    showWinningPatterns,
  };
}

function gameController(){
  const board = gameboard();
  board.displayBoard();

  const player1 = board.createPlayer('Player X','X');
  const player2 = board.createPlayer('Player O','O');  

  const playRound = (index) => {
    const successfulPlacement = board.placeMarker(index,currentPlayer);

    if(!successfulPlacement){
      console.log('Invalid Placement');
    } else{
      board.checkForWinner(currentPlayer);
      const isDraw = board.checkForDraw();

      if(!gameOver) {
        switchTurn();
      }

      if(isDraw){
        board.showWinningPatterns([0,1,2,3,4,5,6,7,8],'rgba(109, 109, 109, 0.285)');

        resultMsg.classList.add('show');
        resultMsg.textContent = 'Draw!';
      }
    }
  }

  let currentPlayer = player1;
  const switchTurn = () => {
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
    currentMarker.textContent = currentPlayer.choice;

    if(currentPlayer.choice === 'X'){
      currentMarker.classList.add('player-x-marker');
      currentMarker.classList.remove('player-o-marker');
    } else if (currentPlayer.choice === 'O'){
      currentMarker.classList.add('player-o-marker');
      currentMarker.classList.remove('player-x-marker');
    }
  }

  const incrementScore = (currentPlayer) => {
    const playerScore = document.getElementById(`${(currentPlayer.choice).toLowerCase()}-score`);
    playerScore.textContent = parseInt(playerScore.textContent) + 1;
  }

  const restartGame = () => {
    const boardArray = board.getBoard();
    for(let i = 0;i < boardArray.length;i++){
      boardArray[i] = '';
    }

    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('player-x-marker','player-o-marker');
      cell.style.backgroundColor = '';
      cell.style.borderColor = '';
    });
    currentPlayer = player1;
    currentMarker.textContent = 'X';

    currentMarker.classList.remove('player-x-marker');
    currentMarker.classList.remove('player-o-marker');
    resultMsg.classList.remove('show');

    gameOver = false;
  }

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell,index) => {
    cell.addEventListener(('click'), () => {
      game.playRound(index);
    })
  })

  return {
    switchTurn,
    playRound,
    restartGame,
    incrementScore,
  }
}

const game = gameController();

const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
  game.restartGame();
})