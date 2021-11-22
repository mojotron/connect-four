import '../styles/reset.css';
import '../styles/main.css';

// const Board = function (rows, cols) {
//   const _board = Array.from({ length: rows }, () =>
//     Array.from({ length: cols }, () => 0)
//   );
//   return {
//     _board
//   }
// };

// const board = Board(6, 7);
const createBoard = function (row, col, cellValue = 0) {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => cellValue)
  );
};

const displayBoard = function (board) {
  console.log('--Connect four board--');
  const tempBoard = [...board];
  tempBoard.reverse();
  tempBoard.forEach(row => console.log(row));
  console.log('--Chose row number--');
  console.log(Array.from({ length: board.length + 1 }, (_, i) => i));
};
//
const findEmptyColumnSlot = function (board, colIndex) {
  // check if top of the column empty
  if (board[board.length - 1][colIndex] !== 0) return -1;
  // find first empty slot form the bottom of the column
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][colIndex] === 0) return i;
  }
  return -1;
};
const setToken = function (board, rowIndex, colIndex, tokenSign) {
  board[rowIndex][colIndex] = tokenSign;
};

const getBottomFour = function (board, startRow, startCol) {
  return Array.from({ length: 4 }, (_, i) => board[startRow - i][startCol]);
};

const checkLineWin = function (line, token) {
  return line.every(ele => ele === token);
};
const checkWinCondition = function (board, startRow, startCol, token) {
  // check bottom +1 0
  if (startRow > 2) {
    console.log(checkLineWin(getBottomFour(board, startRow, startCol), token));
  }

  // check left 0 -1
  // check right 0 +1
  // check bottom-right +1 +1
  // check bottom-left +1 -1
  // check top-left -1 -1
  // check top-right -1 +1
};

const inputToken = function (board, colIndex, tokenSign) {
  if (colIndex < 0 || board.length < colIndex) {
    alert('Invalid input [0-6]');
    return;
  }
  const rowIndex = findEmptyColumnSlot(board, colIndex);
  if (rowIndex === -1) {
    alert('Colum full!');
    return;
  }
  setToken(board, rowIndex, colIndex, tokenSign);
  checkWinCondition(board, rowIndex, colIndex, tokenSign);
};

// Basic game logic
const board = createBoard(6, 7);
displayBoard(board);
let i = 0;
while (i < 10) {
  const token = i % 2 === 0 ? 1 : 2;
  const userInput = Number(prompt('Enter column'));
  console.clear();
  inputToken(board, userInput, token);
  displayBoard(board);
  i += 1;
}
