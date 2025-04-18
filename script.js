const gameboard = () => {
  const board = [];

  const createBoard = () => {
    for(let i = 0;i<3;i++){
      board[i] = [];
      for(let j = 0;j < 3;j++){
        board[i][j] = '';
      }
    }
  }

  const getBoard = () => board;

  return {
    createBoard,
    getBoard,
  };
}

const board = gameboard();
board.createBoard();
console.table(board.getBoard())