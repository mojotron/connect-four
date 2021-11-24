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

// AI
// const getNextFreeMoves = function (board) {
//   const freeSpots = [];
//   // check columns for free spots
//   for (let i = 0; i < COL_NUM; i += 1) {
//     for (let j = 0; j < ROW_NUM; j += 1) {
//       if (board[j][i] === 0) {
//         freeSpots.push([j, i]);
//         break;
//       }
//     }
//   }
//   if (!freeSpots.length) return false;
//   return freeSpots;
// };

// const evaluateMove = function () {};

// const minimax = function (position, depth, maximizer) {
//   // break condition
//   if (maximizer) {
//     const bestMove = -Infinity;
//   } else {
//     const bestMove = Infinity;
//     // loop
//   }
// };

// const findBestMove = function (boardState) {
//   const bestValue = -Infinity;
//   let bestMove;
//   const freeMoves = getNextFreeMoves(boardState);
//   for (const move of freeMoves) {
//     boardState[move[0]][move[1]] = TOKEN_AI;
//     const currentValue = minimax(boardState, 3, false);
//     boardState[move[0]][move[1]] = 0;
//     if (currentValue > bestValue) {
//       bestValue = currentValue;
//       bestMove = move;
//     }
//   }
//   return bestMove;
// };

// Basic game logic
const board = createBoard(ROW_NUM, COL_NUM);
displayBoard(board);
// findBestMove(board);
let i = 0;
while (i < 42) {
  const token = i % 2 === 0 ? TOKEN_PLAYER_1 : TOKEN_AI;
  const userInput = Number(prompt('Enter column'));
  console.clear();
  inputToken(board, userInput, token);
  displayBoard(board);
  const winCondition = checkWinCondition(board, token);
  if (winCondition) {
    alert('WIN');
    break;
  }
  i += 1;
}
