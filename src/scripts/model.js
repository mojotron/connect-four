import {
  ROW_NUM,
  COL_NUM,
  TOKEN_EMPTY_CELL,
  PLAYER_1,
  PLAYER_2,
  PLAYER_AI,
  GAME_MODE,
  DRAW,
  ONE,
  TWO,
} from './config';
import checkWinCondition from './check-win-condition';
import findBestMove from './ai-minimax';
import { boardFull } from './helpers';

export const state = {
  board: null,
  difficulty: null,
  players: {
    one: null,
    two: null,
  },
  currentPlayer: null,

  swapPlayers() {
    this.currentPlayer = this.currentPlayer === ONE ? TWO : ONE;
  },
};

const createBoard = function (row, col, cellValue = TOKEN_EMPTY_CELL) {
  return Array.from({ length: row }, () =>
    Array.from({ length: col }, () => cellValue)
  );
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
  const rowIndex = findEmptyColumnSlot(board, colIndex);
  if (rowIndex === -1) {
    // using default alert, game can go without this alert or custom one
    alert('Colum full!');
    return false;
  }
  setToken(board, rowIndex, colIndex, tokenSign);
  checkWinCondition(board, rowIndex, colIndex, tokenSign);
  return [rowIndex, colIndex];
};

export const checkTerminateState = function () {
  // check for draw
  const draw = boardFull(state.board);
  if (draw) return DRAW;
  // check for win
  const win = checkWinCondition(
    state.board,
    state.players[state.currentPlayer].token
  );
  if (win) return win;
};
// find best move for current game state (board state and game difficulty)
export const aiMove = function () {
  return findBestMove(state.board, GAME_MODE[state.difficulty]);
};
// initialize new game state
const init2PlayerMode = function () {
  state.players.two = PLAYER_2;
};

const initAiMode = function (difficulty) {
  state.players.one = PLAYER_1;
  state.players.two = PLAYER_AI;
  state.difficulty = difficulty;
};

export const init = function (mode) {
  state.players.one = PLAYER_1;
  state.board = createBoard(ROW_NUM, COL_NUM);
  state.currentPlayer = Math.floor(Math.random() * 2) + 1 === 1 ? ONE : TWO;
  if (mode === 'pvp') init2PlayerMode();
  else initAiMode(mode);
};
