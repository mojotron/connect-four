import { ROW_NUM, COL_NUM } from './config';

const checkLineWin = function (line, token) {
  return line.every(ele => ele === token);
};

const rowsCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const temp = [
        board[i][j],
        board[i][j + 1],
        board[i][j + 2],
        board[i][j + 3],
      ];
      if (checkLineWin(temp, token)) return true;
    }
  }
  return false;
};

const columnsCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM; j += 1) {
      const temp = [
        board[i][j],
        board[i + 1][j],
        board[i + 2][j],
        board[i + 3][j],
      ];
      if (checkLineWin(temp, token)) return true;
    }
  }
  return false;
};

const ascendingDiagonalCheck = function (board, token) {
  for (let i = 3; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const temp = [
        board[i][j],
        board[i - 1][j + 1],
        board[i - 2][j + 2],
        board[i - 3][j + 3],
      ];
      if (checkLineWin(temp, token)) return true;
    }
  }
  return false;
};

const descendingDiagonalCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const temp = [
        board[i][j],
        board[i + 1][j + 1],
        board[i + 2][j + 2],
        board[i + 3][j + 3],
      ];
      if (checkLineWin(temp, token)) return true;
    }
  }
  return false;
};

export default function checkWinCondition(boardState, token) {
  if (rowsCheck(boardState, token)) return true;
  if (columnsCheck(boardState, token)) return true;
  if (ascendingDiagonalCheck(boardState, token)) return true;
  if (descendingDiagonalCheck(boardState, token)) return true;
  return false;
}
