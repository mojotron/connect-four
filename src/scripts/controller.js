'use strict';
import '../styles/reset.css';
import '../styles/main.css';

//create board

const createBoard = function (row, col, cellValue = 0) {
  return Array.from({ length: row }, _ => {
    return Array.from({ length: col }, _ => cellValue);
  });
};

const displayBoard = function (board) {
  console.log('--Connect four board--');
  for (const row of board) {
    console.log(row);
  }
  console.log('--Chose row number--');
  console.log(Array.from({ length: board.length + 1 }, (_, i) => i));
};
////////////////////////////////////////////////////////////////////////////////
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
  board[rowIndex][colIndex] = tokenSign;
};

const findEmptyColumnSlot = function (board, colIndex) {
  //check if top of the column empty
  if (board[0][colIndex] !== 0) return -1;
  //find first empty slot form the bottom of the column
  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][colIndex] === 0) return i;
  }
};
///////////////////////////////////////////////////////////////////////////////
const checkWinCondition = function (board, startRow, startCol) {
  //check bottom +1 0
  //check left 0 -1
  //check right 0 +1
  //check bottom-right +1 +1
  //check bottom-left +1 -1
  //check top-left -1 -1
  //check top-right -1 +1
};
///////////////////////////////////////////////////////////////////////////////
const board = createBoard(6, 7);
displayBoard(board);
let i = 0;
while (i < 10) {
  const token = i % 2 === 0 ? 1 : 2;
  const userInput = Number(prompt('Enter column'));
  console.clear();
  inputToken(board, userInput, token);
  displayBoard(board);
  i++;
}
