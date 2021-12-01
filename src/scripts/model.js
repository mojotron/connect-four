import {
  ROW_NUM,
  COL_NUM,
  TOKEN_EMPTY_CELL,
  PLAYER_1,
  PLAYER_2,
} from './config';
import checkWinCondition from './check-win-condition';
// import findBestMove from './ai-minimax';

export const state = {
  board: null,
  difficulty: null,
  players: {
    one: null,
    two: null,
  },
  currentPlayer: null,

  swapPlayers() {
    this.currentPlayer = this.currentPlayer === 'one' ? 'two' : 'one';
  },
};

const createBoard = function (row, col, cellValue = TOKEN_EMPTY_CELL) {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => cellValue)
  );
};
// TODO
const boardFull = function (boardState) {
  for (const row of boardState) {
    if (row.includes(TOKEN_EMPTY_CELL)) return false;
  }
  return true;
};

export const displayBoard = function (board) {
  console.log('--Connect four board--');
  const reversed = JSON.parse(JSON.stringify(board));
  reversed.reverse();
  reversed.forEach(row => console.log(row));
};

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

export const inputToken = function (board, colIndex, tokenSign) {
  // this part is for CLI game style
  // if (colIndex < 0 || board.length < colIndex) {
  //   alert('Invalid input [0-6]');
  //   return false;
  // }

  const rowIndex = findEmptyColumnSlot(board, colIndex);
  if (rowIndex === -1) {
    alert('Colum full!');
    return false;
  }
  setToken(board, rowIndex, colIndex, tokenSign);
  checkWinCondition(board, rowIndex, colIndex, tokenSign);
  return [rowIndex, colIndex];
};

export const checkTerminateState = function (boardState, token) {
  // check for draw
  const draw = boardFull(boardState);
  if (draw) {
    alert('DRAW');
    document.querySelector('.overlay').classList.remove('hidden');
    return;
  }
  // check for win
  const win = checkWinCondition(boardState, token);
  if (win) {
    alert(`Winner is ${token}`);
    document.querySelector('.overlay').classList.remove('hidden');
  }
};

const init2PlayerMode = function () {
  state.players.one = PLAYER_1;
  state.players.two = PLAYER_2;
};

const initAiMode = function (difficulty) {
  state.difficulty = difficulty;
};

export const init = function (mode) {
  state.board = createBoard(ROW_NUM, COL_NUM);
  state.currentPlayer = Math.floor(Math.random() * 2) + 1 === 1 ? 'one' : 'two';
  if (mode === 'pvp') init2PlayerMode();
  if (mode === 'ai') initAiMode('easy');
};
