import { ROW_NUM, COL_NUM } from './config';

const checkLineWin = function (board, line, token) {
  return line.every(ele => {
    const [i, j] = ele;
    return board[i][j] === token;
  });
};

const rowsCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        [i, j],
        [i, j + 1],
        [i, j + 2],
        [i, j + 3],
      ];
      if (checkLineWin(board, line, token)) return line;
    }
  }
  return false;
};

const columnsCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM; j += 1) {
      const line = [
        [i, j],
        [i + 1, j],
        [i + 2, j],
        [i + 3, j],
      ];
      if (checkLineWin(board, line, token)) return line;
    }
  }
  return false;
};

const ascendingDiagonalCheck = function (board, token) {
  for (let i = 3; i < ROW_NUM; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        [i, j],
        [i - 1, j + 1],
        [i - 2, j + 2],
        [i - 3, j + 3],
      ];
      if (checkLineWin(board, line, token)) return line;
    }
  }
  return false;
};

const descendingDiagonalCheck = function (board, token) {
  for (let i = 0; i < ROW_NUM - 3; i += 1) {
    for (let j = 0; j < COL_NUM - 3; j += 1) {
      const line = [
        [i, j],
        [i + 1, j + 1],
        [i + 2, j + 2],
        [i + 3, j + 3],
      ];
      if (checkLineWin(board, line, token)) return line;
    }
  }
  return false;
};

export default function checkWinCondition(boardState, token) {
  const rowWin = rowsCheck(boardState, token);
  if (rowWin) return rowWin;
  const columnWin = columnsCheck(boardState, token);
  if (columnWin) return columnWin;
  const ascendingDiagonalWin = ascendingDiagonalCheck(boardState, token);
  if (ascendingDiagonalWin) return ascendingDiagonalWin;
  const descendingDiagonalWin = descendingDiagonalCheck(boardState, token);
  if (descendingDiagonalWin) return descendingDiagonalWin;
  return false;
}
