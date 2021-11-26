import '../styles/reset.css';
import '../styles/main.css';
import {
  ROW_NUM,
  COL_NUM,
  TOKEN_EMPTY_CELL,
  TOKEN_PLAYER_1,
  TOKEN_AI,
} from './config';
import checkWinCondition from './check-win-condition';
import findBestMove from './ai-minimax';

const createBoard = function (row, col, cellValue = TOKEN_EMPTY_CELL) {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => cellValue)
  );
};

const displayBoard = function (board) {
  console.log('--Connect four board--');
  const reversed = JSON.parse(JSON.stringify(board));
  reversed.reverse();
  reversed.forEach(row => console.log(row));
  console.log('--Chose row number--');
  console.log(Array.from({ length: board.length + 1 }, (_, i) => i));
};
//
const findEmptyColumnSlot = function (board, colIndex) {
  // check if top of the column empty
  if (board[board.length - 1][colIndex] !== TOKEN_EMPTY_CELL) return -1;
  // find first empty slot form the bottom of the column
  for (let i = 0; i < board.length; i += 1) {
    if (board[i][colIndex] === TOKEN_EMPTY_CELL) return i;
  }
  return -1;
};
const setToken = function (board, rowIndex, colIndex, tokenSign) {
  board[rowIndex][colIndex] = tokenSign;
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

const board = createBoard(ROW_NUM, COL_NUM);
displayBoard(board);
// findBestMove(board);
let i = 0;
while (i < 42) {
  const userInput = Number(prompt('Enter column'));
  console.clear();
  inputToken(board, userInput, TOKEN_PLAYER_1);
  const ai = findBestMove(board);
  inputToken(board, ai[1], TOKEN_AI);
  displayBoard(board);
  const winCondition = checkWinCondition(board, TOKEN_PLAYER_1);
  const loseCondition = checkWinCondition(board, TOKEN_AI);
  if (winCondition) {
    alert('WIN');
    break;
  }
  if (loseCondition) {
    alert('ai win');
    break;
  }
  i += 1;
}
